import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'primary';
}

const VARIANT_CLASSES: Record<string, string> = {
  default: 'bg-accent text-primary border border-transparent',
  outline: 'bg-transparent text-primary border border-primary',
  primary: 'bg-primary text-secondary',
};

const BASE_CLASSES =
  'inline-flex items-center gap-0.5rem rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide border';

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default;
  return (
    <span className={cn(BASE_CLASSES, variantClass, className)}>
      {children}
    </span>
  );
}
