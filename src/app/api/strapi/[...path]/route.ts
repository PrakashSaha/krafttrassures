import { NextResponse } from 'next/server';

async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://kraft.slingverse.in').replace(/\/$/, '');

  const { path } = await params;
  const query = new URL(request.url).search;
  const authorization = request.headers.get('authorization');
  const response = await fetch(`${strapiUrl}/api/${path.join('/')}${query}`, {
    method: request.method,
    headers: {
      'Content-Type': request.headers.get('content-type') || 'application/json',
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
    cache: 'no-store',
  });

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  return new NextResponse(await response.text(), {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('content-type') || 'application/json' },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
