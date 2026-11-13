import type { ReactNode } from 'react';
import Link from 'next/link';
import { LiveSearch } from '@/components/search/live-search';

export interface CatalogHeroCrumb {
  label: string;
  href?: string;
}

export interface CatalogHeroCategory {
  slug: string;
  name: string;
  short: string;
}

interface CatalogHeroProps {
  breadcrumbs: CatalogHeroCrumb[];
  kicker?: string;
  title: string;
  description: ReactNode;
  categories: CatalogHeroCategory[];
  /** Search box default value (e.g. the active `?search=` term). */
  searchDefault?: string;
  /** Category preselected in the search dropdown (category name). */
  categoryDefault?: string;
  /** Extra hidden fields so search stays scoped to the current page. */
  hiddenParams?: Record<string, string>;
  ribbonTitle?: ReactNode;
  ribbonSubtitle?: string;
  image?: string;
}

const DEFAULT_IMAGE = '/assets/img/engine-lm2500-banner.jpg';

/**
 * Shared catalogue hero used by /products-style listing pages (categories,
 * brands and part types) so the top of every listing page matches.
 */
export function CatalogHero({
  breadcrumbs,
  kicker = 'GAS TURBINE & INDUSTRIAL SPARE PARTS',
  title,
  description,
  categories,
  searchDefault,
  categoryDefault,
  hiddenParams,
  ribbonTitle = (
    <>
      Gas Turbine &amp;
      <br />
      Industrial Components
    </>
  ),
  ribbonSubtitle = 'OEM | Aftermarket | Repair Support',
  image = DEFAULT_IMAGE,
}: CatalogHeroProps) {
  return (
    <section className="relative h-[500px] min-h-[500px] overflow-visible bg-[#06263b] text-white md:h-[350px] md:min-h-[350px]">
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `linear-gradient(90deg,#06263bea,#06263b99),url("${image}")`,
        }}
      />
      <div
        className="absolute inset-y-0 left-[46%] right-0 hidden bg-cover bg-center md:block"
        style={{
          backgroundImage: `linear-gradient(90deg,#06263b 0%,transparent 28%),url("${image}")`,
        }}
      />

      <div className="relative z-[1] px-5 py-9 md:px-[7.3%] md:pb-[22px] md:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#c9d9e6]"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.label} className="flex items-center gap-2">
              <span aria-hidden="true">›</span>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#ffc34f]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <p className="flex items-center gap-2.5 text-[13px] font-extrabold leading-[normal] tracking-[1.2px] text-[#ffc34f]">
          <i className="h-[2px] w-[31px] bg-[#f5b83f]" /> {kicker}
        </p>

        <h1 className="my-2.5 text-[39px] font-bold leading-[1.02] tracking-[-1.5px] md:text-[49px] md:leading-[1.01]">
          {title}
        </h1>

        <p className="my-3 max-w-[640px] text-[13px] leading-[1.5] text-[#e7eff5] md:text-[15px]">
          {description}
        </p>

        <LiveSearch
          variant="hero"
          defaultValue={searchDefault}
          categories={categories}
          categoryDefault={categoryDefault}
          hiddenParams={hiddenParams}
        />

        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-3 md:gap-x-8">
          <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
            <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
              ✈
            </b>
            <span>
              <strong className="block text-[10px] md:text-xs">
                Global Supply
              </strong>
              <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                Sourcing from trusted OEMs
              </small>
            </span>
          </div>

          <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
            <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
              ♢
            </b>
            <span>
              <strong className="block text-[10px] md:text-xs">
                Quality-Assured Parts
              </strong>
              <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                Inspected &amp; verified
              </small>
            </span>
          </div>

          <div className="flex items-center gap-1.5 border-r border-white/30 pr-2.5 last:border-0 md:gap-3 md:pr-[30px]">
            <b className="text-[21px] font-normal leading-none text-[#ffc04f] md:text-[28px]">
              ◷
            </b>
            <span>
              <strong className="block text-[10px] md:text-xs">
                Quick Quotations
              </strong>
              <small className="mt-[3px] block text-[9px] text-[#d2e0e9] md:text-[10px]">
                Get a response fast
              </small>
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-0 z-[2] hidden border-l-[5px] border-[#ffc04f] bg-[#062b45]/[0.85] px-8 py-4 pl-[46px] [clip-path:polygon(9%_0,100%_0,100%_100%,0_100%)] md:block">
        <b className="block text-[17px] leading-[1.2]">{ribbonTitle}</b>
        <small className="mt-[5px] block text-[11px]">{ribbonSubtitle}</small>
      </div>
    </section>
  );
}

export default CatalogHero;
