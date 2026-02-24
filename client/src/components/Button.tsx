import React from 'react';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  className?: string;
}

export default function Button({
  label,
  icon,
  variant = 'primary',
  onClick,
  href,
  type = 'button',
  ariaLabel,
  className = '',
}: ButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 relative flex-[0_0_auto] transition-all cursor-pointer rounded";
  
  const variantClasses = {
    primary: "bg-primary-500 shadow-[4px_4px_0px_var(--color-primary-900)] hover:shadow-[2px_2px_0px_var(--color-primary-900)] hover:translate-x-[2px] hover:translate-y-[2px]",
    secondary: "bg-white border-2 border-neutral-950 shadow-[4px_4px_0px_var(--color-neutral-950)] hover:shadow-[2px_2px_0px_var(--color-neutral-950)] hover:translate-x-[2px] hover:translate-y-[2px]"
  };

  const textClasses = {
    primary: "text-neutral-950",
    secondary: "text-neutral-950"
  };

  // If href is provided, render as a link (SSR-compatible)
  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        aria-label={ariaLabel}
      >
        {icon && (
          <div className="relative w-4 h-[19px]" aria-hidden="true">
            {icon}
          </div>
        )}
        <div className="inline-flex items-center flex-col relative flex-[0_0_auto]">
          <span className={`relative flex items-center justify-center w-fit mt-[-1.00px] text-small-bold ${textClasses[variant]} text-center whitespace-nowrap`}>
            {label}
          </span>
        </div>
      </a>
    );
  }

  // Otherwise render as a button (only use onClick if provided)
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && (
        <div className="relative w-4 h-[19px]" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="inline-flex items-center flex-col relative flex-[0_0_auto]">
        <span className={`relative flex items-center justify-center w-fit mt-[-1.00px] text-small-bold ${textClasses[variant]} text-center whitespace-nowrap`}>
          {label}
        </span>
      </div>
    </button>
  );
}
