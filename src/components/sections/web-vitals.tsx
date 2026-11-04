'use client';

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';
import { reportWebVitals } from '@/lib/performance';

export function WebVitalsMonitor() {
  if (typeof window === 'undefined') {
    return null;
  }

  onCLS((metric) => {
    reportWebVitals({
      name: 'CLS',
      value: metric.value,
      rating: metric.value <= 0.1 ? 'good' : metric.value <= 0.25 ? 'needs-improvement' : 'poor',
      delta: metric.delta,
      id: metric.id,
    });
  });

  onFCP((metric) => {
    reportWebVitals({
      name: 'FCP',
      value: metric.value,
      rating: metric.value <= 1800 ? 'good' : metric.value <= 3000 ? 'needs-improvement' : 'poor',
      delta: metric.delta,
      id: metric.id,
    });
  });

  onINP((metric) => {
    reportWebVitals({
      name: 'INP',
      value: metric.value,
      rating: metric.value <= 200 ? 'good' : metric.value <= 500 ? 'needs-improvement' : 'poor',
      delta: metric.delta,
      id: metric.id,
    });
  });

  onLCP((metric) => {
    reportWebVitals({
      name: 'LCP',
      value: metric.value,
      rating: metric.value <= 2500 ? 'good' : metric.value <= 4000 ? 'needs-improvement' : 'poor',
      delta: metric.delta,
      id: metric.id,
    });
  });

  onTTFB((metric) => {
    reportWebVitals({
      name: 'TTFB',
      value: metric.value,
      rating: metric.value <= 800 ? 'good' : metric.value <= 1800 ? 'needs-improvement' : 'poor',
      delta: metric.delta,
      id: metric.id,
    });
  });

  return null;
}
