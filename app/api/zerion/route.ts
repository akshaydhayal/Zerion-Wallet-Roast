import { NextRequest, NextResponse } from 'next/server';

const ZERION_API_BASE = 'https://api.zerion.io/v1';
const API_KEY = process.env.NEXT_PUBLIC_ZERION_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('address');
    const endpoint = searchParams.get('endpoint'); // 'portfolio' or 'positions'

    if (!walletAddress || !endpoint) {
      return NextResponse.json(
        { error: 'Missing wallet address or endpoint' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Zerion API key not configured' },
        { status: 500 }
      );
    }

    let url = '';
    if (endpoint === 'portfolio') {
      url = `${ZERION_API_BASE}/wallets/${walletAddress}/portfolio?currency=usd`;
    } else if (endpoint === 'positions') {
      url = `${ZERION_API_BASE}/wallets/${walletAddress}/positions?filter[positions]=only_simple&filter[trash]=only_non_trash&sort=value&page[size]=20&currency=usd`;
    } else {
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }

    console.log('🌐 Proxying request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${API_KEY}:`).toString('base64')}`,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      console.error('❌ Zerion API error:', response.status, errorData);
      return NextResponse.json(
        { error: `Zerion API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('❌ Failed to parse response as JSON:', error);
      return NextResponse.json(
        { error: 'Invalid response from Zerion API' },
        { status: 500 }
      );
    }

    console.log('✅ Proxy response successful');
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
