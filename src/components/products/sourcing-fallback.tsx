import { SourcingCard } from './sourcing-card';

interface SourcingFallbackProps {
  query: string;
  brand?: string;
}

/**
 * Empty-search state that keeps the visitor moving: the query is shown as a
 * sourceable part with a quote (email) and WhatsApp action, instead of a
 * dead-end "No Products Found" message.
 */
export function SourcingFallback({ query, brand }: SourcingFallbackProps) {
  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3">
      <SourcingCard query={query} brand={brand} />
    </div>
  );
}

export default SourcingFallback;
