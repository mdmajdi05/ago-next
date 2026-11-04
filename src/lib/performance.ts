/**
 * Performance monitoring utilities for Core Web Vitals.
 * Reports LCP, INP, CLS, FCP, TTFB to analytics endpoint.
 */

export type WebVitalMetric = {
  name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

const THRESHOLDS: Record<string, { good: number; needsImprovement: number }> = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

function getRating(metricName: string, value: number): WebVitalMetric['rating'] {
  const t = THRESHOLDS[metricName];
  if (!t) return 'good';
  if (value <= t.good) return 'good';
  if (value <= t.needsImprovement) return 'needs-improvement';
  return 'poor';
}

export function sendWebVital(metric: WebVitalMetric): void {
  // Send to analytics endpoint (GA4 / GTM) — fire and forget
  if (typeof window === 'undefined') return;

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.value),
    non_interaction: true,
    custom_parameter: {
      rating: metric.rating,
      delta: metric.delta,
    },
  });
}

/**
 * Logs performance metrics to console in development.
 */
export function logWebVital(metric: WebVitalMetric): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)}ms — ${metric.rating}`);
  }
}

/**
 * Helper to wrap a Core Web Vitals callback with logging + sending.
 */
export function reportWebVitals(metric: WebVitalMetric): void {
  logWebVital(metric);
  sendWebVital(metric);
}
