import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'heroGold' | 'serve' | 'gold' | 'secondary';

const base =
  'group relative inline-flex items-center justify-center gap-[10px] overflow-hidden text-center align-middle font-[\'Yantramanav\'] text-[13.5px] font-bold uppercase leading-[1.5] tracking-[0.9px] transition-[transform,box-shadow,background,color] duration-300';

const variants: Record<Variant, string> = {
  primary:
    'min-h-[52px] rounded-full border-0 bg-[linear-gradient(135deg,#014a8e_0%,#0a63bd_100%)] px-[30px] py-[14px] text-white shadow-[0_14px_30px_rgba(1,74,142,0.28)] hover:-translate-y-[3px] hover:bg-[linear-gradient(135deg,#f0a945_0%,#ffc46b_100%)] hover:text-[#0a1c30] hover:shadow-[0_20px_42px_rgba(240,169,69,0.42)]',
  heroGold:
    'min-h-[54px] rounded-[12px] border border-[#f0a843] bg-[#f0a843] px-[26px] py-0 font-extrabold text-[#14273a] shadow-[0_12px_26px_rgba(240,168,67,0.23)] hover:-translate-y-[2px] hover:border-[#ffc66f] hover:bg-[#ffc66f] hover:shadow-[0_16px_32px_rgba(240,168,67,0.3)]',
  serve:
    'min-h-[46px] rounded-[10px] border-[1.6px] border-[rgba(1,74,142,0.2)] bg-transparent px-[22px] py-[11px] text-[12px] font-bold tracking-[0.9px] text-[#014a8e] shadow-none hover:-translate-y-[3px] hover:border-[#014a8e] hover:bg-[#014a8e] hover:text-white hover:shadow-[0_16px_30px_rgba(1,74,142,0.3)]',
  gold:
    'min-h-[48px] rounded-[11px] border-0 bg-[#f0a843] px-[22px] py-0 font-extrabold text-[#12263b] shadow-none hover:-translate-y-[2px] hover:bg-[#ffc66f] hover:shadow-[0_12px_24px_rgba(240,168,67,0.24)]',
  secondary:
    'min-h-[48px] rounded-[11px] border-0 bg-[#f0a843] px-[22px] py-0 font-extrabold text-[#12263b] shadow-none hover:-translate-y-[2px] hover:bg-[#ffc66f] hover:shadow-[0_12px_24px_rgba(240,168,67,0.24)]',
};

export function AgoButton({
  href,
  children,
  variant = 'primary',
  className = '',
  arrow = true,
  type,
  name,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: 'button' | 'submit';
  name?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {variant === 'primary' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -left-[130%] h-full w-[55%] -skew-x-[18deg] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.5),transparent)] transition-[left] duration-500 group-hover:left-[135%]"
        />
      ) : null}
      <span className="relative z-[1]">{children}</span>
      {arrow ? <i className="fa-solid fa-arrow-right relative z-[1] text-[11px] transition-transform duration-300 group-hover:translate-x-[5px]" aria-hidden="true" /> : null}
    </>
  );

  if (type) {
    return (
      <button type={type} name={name} className={cls}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? '/contact'} className={cls}>
      {content}
    </Link>
  );
}

export const Button = AgoButton;
