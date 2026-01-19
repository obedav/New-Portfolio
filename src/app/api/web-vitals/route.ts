import { NextRequest, NextResponse } from 'next/server';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalMetric = await request.json();

    // Log metrics (in production, send to your analytics service)
    console.log('[Web Vitals API]', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      timestamp: new Date().toISOString(),
    });

    // Here you could send to:
    // - Google Analytics 4
    // - Custom analytics database
    // - Monitoring service (DataDog, New Relic, etc.)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Web Vitals API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process metric' },
      { status: 400 }
    );
  }
}
