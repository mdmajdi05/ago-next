import { Fragment } from 'react';
import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-1.5 text-[12px] text-muted" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <Fragment key={item.href}>
          {index > 0 && (
            <span className="text-primary/20" aria-hidden="true">
              ›
            </span>
          )}
          {index === items.length - 1 ? (
            <span className="text-ink font-semibold">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-ink hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
