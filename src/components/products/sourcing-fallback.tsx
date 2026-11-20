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
    <>
      <div className="mb-3 rounded-[10px] border border-[#d5e8f6] bg-[#eef7fd] px-3.5 py-2.5 text-[11px] leading-[1.5] text-[#2d5570]">
        <b>“{query}”</b> isn&apos;t listed in our online catalogue, but we can
        source it. Send your part number and our team will confirm availability,
        condition and lead time.
      </div>
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3">
        <SourcingCard query={query} brand={brand} />
      </div>
    </>
  );
}

export default SourcingFallback;
