import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://kraft.slingverse.in').replace(/\/$/, '');

  try {
    const response = await fetch(`${strapiUrl}/api/auth/${path.join('/')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: await request.text(),
      cache: 'no-store',
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
    });
  } catch {
    return NextResponse.json(
      { error: { message: 'Authentication service is unavailable' } },
      { status: 502 },
    );
  }
}
