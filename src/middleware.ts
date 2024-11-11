import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_URL, privateRoutes, protectedRoutes } from '@/constants/urls';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (
    !sessionToken &&
    protectedRoutes.some((route) => request.nextUrl.pathname === route)
  ) {
    return NextResponse.redirect(new URL(PUBLIC_URL.LOGIN, request.url));
  }

  if (sessionToken && request.nextUrl.pathname === PUBLIC_URL.LOGIN) {
    return NextResponse.redirect(new URL(PUBLIC_URL.HOME, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    protectedRoutes.map((route) => {
      return `${route}/:path*`;
    }),
    privateRoutes.map((route) => {
      return `${route}/:path*`;
    }),
  ],
};
