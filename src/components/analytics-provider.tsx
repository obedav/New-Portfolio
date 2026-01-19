'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onTTFB, onFCP, Metric } from 'web-vitals';

function reportWebVital(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to analytics endpoint in production
  if (process.env.NODE_ENV === 'production') {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    });

    // Use sendBeacon for reliability during page unload
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/web-vitals', body);
    } else {
      fetch('/api/web-vitals', {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  }
}

function WebVitalsReporter() {
  useEffect(() => {
    // Core Web Vitals
    onLCP(reportWebVital);  // Largest Contentful Paint
    onCLS(reportWebVital);  // Cumulative Layout Shift
    onINP(reportWebVital);  // Interaction to Next Paint

    // Additional metrics
    onTTFB(reportWebVital); // Time to First Byte
    onFCP(reportWebVital);  // First Contentful Paint
  }, []);

  return null;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WebVitalsReporter />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
