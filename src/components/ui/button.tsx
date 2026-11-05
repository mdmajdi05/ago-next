import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'heroGold' | 'serve' | 'gold' | 'secondary';

const base = 'ago-btn';

const variants: Record<Variant, string> = {
  primary: 'ago-btn--primary',
  heroGold: 'ago-btn--hero-gold',
  serve: 'ago-btn--serve',
  gold: 'ago-btn--gold',
  secondary: 'ago-btn--secondary',
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
  const cls = [base, variants[variant], className].filter(Boolean).join(' ');
  const content = (
    <>
      {variant === 'primary' ? <span aria-hidden="true" className="ago-btn__shine" /> : null}
      <span className="ago-btn__label">{children}</span>
      {arrow ? <i className="fa-solid fa-arrow-right ago-btn__arrow" aria-hidden="true" /> : null}
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
