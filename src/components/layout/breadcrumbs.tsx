import React from 'react';
import Link from 'next/link';
import { Fragment } from 'react';

export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="ago-crumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <Fragment key={item.href}>
          {index > 0 && (
            <span className="crumb-separator" aria-hidden="true">
              /
            </span>
          )}
          {index === items.length - 1 ? (
            <span className="crumb-current">{item.label}</span>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
