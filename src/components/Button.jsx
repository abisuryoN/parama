import React from 'react';

/**
 * Button component with premium typography and hover animations.
 * Supports primary (solid green) and secondary (outline border) variants.
 */
export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-sans font-medium text-sm tracking-wider uppercase transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-brand-green/50 active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-brand-green text-brand-cream hover:bg-brand-green-light hover:shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5',
    secondary: 'border border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-cream hover:shadow-md hover:-translate-y-0.5',
    dark: 'bg-brand-dark text-brand-cream hover:bg-brand-dark-soft hover:shadow-lg hover:shadow-brand-dark/20 hover:-translate-y-0.5',
    white: 'bg-white text-brand-green border border-brand-green/30 hover:bg-brand-cream-soft hover:shadow-md hover:-translate-y-0.5',
  };

  const selectedClass = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={selectedClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={selectedClass} {...props}>
      {children}
    </button>
  );
}
