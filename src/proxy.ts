import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('kt_auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ['/checkout', '/account', '/wishlist'];
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Verify token with jose
      await jwtVerify(token, JWT_SECRET);
    } catch (error) {
      // Token is invalid or expired
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      
      const response = NextResponse.redirect(url);
      response.cookies.delete('kt_auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/account/:path*',
    '/wishlist/:path*',
  ],
};
