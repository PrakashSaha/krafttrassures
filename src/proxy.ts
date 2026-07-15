import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
