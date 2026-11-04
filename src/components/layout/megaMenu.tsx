'use client';

import React, { ReactElement, ReactNode, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type MegaMenuTrigger = ReactElement<{ className?: string; [key: string]: unknown }>;

interface MegaMenuProps {
  trigger: MegaMenuTrigger;
  children: ReactNode;
}

export function MegaMenu({ trigger, children }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  const handleEnter = useCallback(() => {
    if (closeTimer) clearTimeout(closeTimer);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimer = setTimeout(() => setOpen(false), 150);
  }, []);

  const triggerElement = React.cloneElement(trigger, {
    className: cn(trigger.props.className, open && 'text-primary'),
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
          role="menu"
          aria-label="Mega menu"
          className="absolute top-full left-0 right-0 mx-auto mt-0 w-full max-w-[calc(100vw-40px)] bg-white border border-[rgba(1,74,142,0.20)] border-r rounded-2xl shadow-[0_20px_50px_rgba(10,28,48,0.14)] p-4 md:p-6"
        >
          {children}
        </div>
      )}
    </div>
  );
}
