import { NextRequest, NextResponse } from 'next/server';

const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD;
const PICKUP_PINCODE = process.env.SHIPROCKET_PICKUP_PINCODE;
const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external';

// ponytail: token cached in-memory per cold start; good enough for serverless, no DB needed
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getShiprocketToken(): Promise<string | null> {
  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD) return null;

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const res = await fetch(`${SHIPROCKET_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: SHIPROCKET_EMAIL, password: SHIPROCKET_PASSWORD }),
  });

  if (!res.ok) {
    console.error('[Shiprocket] Auth failed:', res.status);
    return null;
  }

  const data = await res.json();
  // Token valid for ~10 days; cache for 9 days to be safe
  cachedToken = { value: data.token, expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000 };
  return data.token;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pincode = searchParams.get('pincode');
  const weight = searchParams.get('weight') || '0.5';

  if (!pincode) {
    return NextResponse.json({ error: 'pincode is required' }, { status: 400 });
  }

  if (!SHIPROCKET_EMAIL || !SHIPROCKET_PASSWORD || !PICKUP_PINCODE) {
    // Graceful degradation: no Shiprocket config → free shipping
    return NextResponse.json({ available: false, charge: 0, estimatedDays: null, reason: 'Shiprocket not configured' });
  }

  const token = await getShiprocketToken();
  if (!token) {
    return NextResponse.json({ available: false, charge: 0, estimatedDays: null, reason: 'Auth failed' });
  }

  try {
    const url = `${SHIPROCKET_BASE}/courier/serviceability/?pickup_postcode=${PICKUP_PINCODE}&delivery_postcode=${pincode}&weight=${weight}&cod=0`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error('[Shiprocket] Serviceability check failed:', res.status);
      return NextResponse.json({ available: false, charge: 0, estimatedDays: null });
    }

    const data = await res.json();
    const couriers = data?.data?.available_courier_companies;

    if (!couriers || couriers.length === 0) {
      return NextResponse.json({ available: false, charge: 0, estimatedDays: null, reason: 'Not serviceable' });
    }

    // Pick cheapest courier
    const cheapest = couriers.reduce((min: any, c: any) => (c.rate < min.rate ? c : min), couriers[0]);

    return NextResponse.json({
      available: true,
      charge: Math.round(cheapest.rate),
      estimatedDays: cheapest.estimated_delivery_days || cheapest.etd ? parseInt(cheapest.etd) || null : null,
      courierName: cheapest.courier_name,
    });
  } catch (err) {
    console.error('[Shiprocket] Error:', err);
    return NextResponse.json({ available: false, charge: 0, estimatedDays: null });
  }
}
