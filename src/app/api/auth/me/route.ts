import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://kraft.slingverse.in';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('kt_auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null, reason: 'No token cookie found' }, { status: 200 });
    }

    const res = await fetch(`${STRAPI_URL}/api/users/me?populate=*`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        cookieStore.delete('kt_auth_token');
      }
      return NextResponse.json({ user: null, reason: 'Invalid or expired token' }, { status: 200 });
    }

    const rawUser = await res.json();
    const user = rawUser.data || rawUser;
    
    return NextResponse.json({ user, jwt: token }, { status: 200 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null, error: 'Internal Server Error' }, { status: 500 });
  }
}
