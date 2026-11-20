import { siteConfig } from '@/config/site';

interface SourcingCardProps {
  /** Exactly what the visitor typed into the search box. */
  query: string;
  brand?: string;
}

const FALLBACK_IMAGE = '/ago-aviation/product-turbine-blade.jpg';

/**
 * Shown when a search has no catalogue match. The visitor's query becomes the
 * part reference so they can still request a quote (email) or contact the team
 * directly on WhatsApp instead of hitting a dead end.
 */
export function SourcingCard({ query, brand = 'AGO Sourcing' }: SourcingCardProps) {
  const subject = `Quotation request for ${query}`;
  const body = [
    'Hello AGO Aviation,',
    '',
    `I would like a quotation for: ${query}`,
    '',
    'Quantity:',
    'Delivery location:',
    'Required by:',
    '',
    'Please confirm availability, condition and lead time.',
  ].join('\n');

  const quoteHref = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi AGO Aviation, I need a quote for ${query}. Please share availability, condition and lead time.`,
  )}`;

  return (
    <article className="min-w-0 overflow-hidden rounded-[14px] border border-[#e7edf2] bg-white shadow-[0_3px_12px_#102b4508] max-[390px]:grid max-[390px]:grid-cols-[40%_1fr]">
      <img
        src={FALLBACK_IMAGE}
        alt={`${query} sourced by AGO Aviation`}
        className="h-[110px] w-full bg-gradient-to-b from-white to-[#f7f9fb] object-contain p-[7px] md:h-[118px] max-[390px]:h-full max-[390px]:min-h-[220px]"
      />

      <div className="px-[9px] pb-2.5 md:px-[13px] md:pb-3">
        <span className="inline-block rounded-[12px] bg-[#dce8f2] px-2 py-[3px] text-[9px] font-extrabold uppercase">
          {brand}
        </span>

        <h3 className="mb-0.5 mt-[7px] line-clamp-2 text-[13px] font-bold leading-[1.2] md:text-[15px]">
          {query}
        </h3>

        <p className="my-[5px] text-[11px] text-[#344b60]">
          P/N: {query} · Sourced on request
        </p>

        <p className="my-[5px] line-clamp-2 text-[9px] leading-[1.35] text-[#20394f] md:text-[10px]">
          This reference is not listed in our online catalogue. Our sourcing
          team will confirm availability, condition and lead time.
        </p>

        <span className="mb-2.5 mt-1 inline-block rounded-full bg-[#e6f7ee] px-2.5 py-1 text-[10px] font-bold text-[#0b7a4b]">
          ● Available
        </span>

        <div className="flex gap-1.5 max-[760px]:flex-col">
          <a
            href={quoteHref}
            className="flex-1 whitespace-nowrap rounded-[7px] bg-[#062a43] px-1.5 py-2.5 text-center text-[10px] font-bold text-white"
          >
            Request a Quote
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-[7px] bg-[#25d366] px-1.5 py-2.5 text-center text-[10px] font-bold text-white transition hover:bg-[#1ebe5a]"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default SourcingCard;
