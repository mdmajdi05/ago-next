'use client';

import React from 'react';
import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

type MegaMenuTrigger = ReactElement<{ className?: string; [key: string]: unknown }, typeof Link>;
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MegaMenuProps {
  trigger: MegaMenuTrigger;
  children: ReactNode;
}

export function MegaMenu({ trigger, children }: MegaMenuProps) {
  const [open, setOpen] = useState(false);

  const handleEnter = () => setOpen(true);
  let closeTimer: ReturnType<typeof setTimeout>;
  const handleLeave = () => {
    closeTimer = setTimeout(() => setOpen(false), 150);
  };

  const triggerElement = React.cloneElement(trigger, {
    className: cn(trigger.props.className, open ? 'font-bold text-primary' : ''),
    'aria-expanded': open,
    'aria-haspopup': 'menu',
  });

  return (
    <div className="relative group" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {triggerElement}
      {open && (
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          aria-label="Mega menu"
          className="absolute z-[70] left-1/2 -translate-x-1/2 top-full min-w-[720px] max-w-[1280px] w-[92vw] rounded-2xl border border-border bg-white shadow-2xl ring-1 ring-black/5 p-6 md:p-8"
        >
          {children}
        </div>
      )}
    </div>
  );
}
