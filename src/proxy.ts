import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Avoid errors if JWT_SECRET is not defined at build time
const secretString = process.env.JWT_SECRET || 'secret';
const JWT_SECRET = new TextEncoder().encode(secretString);

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('kt_auth_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/checkout', '/account', '/wishlist'];
  const isProtected = protectedPaths.some(path => 
    pathname.includes(path)
  );

  if (isProtected) {
    const loginPath = '/login';

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (error) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      url.searchParams.set('redirect', pathname);
      
      const response = NextResponse.redirect(url);
      response.cookies.delete('kt_auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
