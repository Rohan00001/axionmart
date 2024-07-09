import { NextRequest, NextResponse } from 'next/server'
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    const url = request.nextUrl

    if (!accessTokenCookie && (
        url.pathname.startsWith('/home') ||
        url.pathname.startsWith('/create-new-product')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (accessTokenCookie && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up')
    )) {
        return NextResponse.redirect(new URL('/home', request.url))
    }



}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/home',
        '/create-new-product',
        // '/verify/:path*'
    ]
}