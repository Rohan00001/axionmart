import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');

    // console.log(accessTokenCookie);

    let tokenIsAccessible = false;

    if (accessTokenCookie) {
        try {
            const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
            const { payload } = await jwtVerify(accessTokenCookie.value, secret);
            // console.log(payload);
            tokenIsAccessible = !!payload;
        } catch (error) {
            console.log('Error verifying token:', error);
        }
    }

    const url = request.nextUrl;

    // Redirect if no access token and trying to access protected routes
    if (!tokenIsAccessible && (
        url.pathname.startsWith('/home') ||
        url.pathname.startsWith('/create-new-product') ||
        url.pathname.startsWith('/cart') ||
        url.pathname.startsWith('/categories') ||
        url.pathname.startsWith('/checkout') ||
        url.pathname.startsWith('/orders')
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect if access token exists and trying to access public routes
    if (tokenIsAccessible && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname === '/'
    )) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    // Allow the request to proceed if none of the conditions above are met
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/home',
        '/create-new-product',
        '/cart',
        '/categories/:path*',
        '/checkout',
        '/orders',
    ]
};
