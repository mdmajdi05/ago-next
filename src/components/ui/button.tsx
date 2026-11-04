import { cn } from '@/lib/utils';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: 'primary-btn',
  ghost: 'ghost-btn',
  secondary: 'secondary-btn',
};

export function Button({
  children,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  disabled,
  href,
}: ButtonProps) {
  const componentClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;

  if (href) {
    return (
      <a
        href={href}
        className={cn(componentClass, className)}
        aria-disabled={disabled || undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(componentClass, className)}
    >
      {children}
    </button>
  );
}
