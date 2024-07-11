import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { userDetailsFromToken } from './lib/userDetailsFromToken';

// Define the UserDetails interface to type the decoded token
interface UserDetails {
    userId: string;
    username: string;
    // Add other properties as needed
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');

    console.log(accessTokenCookie);

    let tokenIsAccessible = false;

    if (accessTokenCookie) {
        try {
            const decodedToken = jwt.verify(accessTokenCookie.value, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload & UserDetails;
            console.log(decodedToken);
            tokenIsAccessible = !!decodedToken;
        } catch (error) {
            console.log('Error verifying token:', error);
        }
    }

    const url = request.nextUrl;

    // Redirect if no access token and trying to access protected routes
    if (!tokenIsAccessible && (
        url.pathname.startsWith('/home') ||
        url.pathname.startsWith('/create-new-product')
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect if access token exists and trying to access public routes
    if (tokenIsAccessible && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/')
    )) {
        return NextResponse.redirect(new URL('/home', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/home',
        '/create-new-product',
        // '/verify/:path*'
    ]
};
