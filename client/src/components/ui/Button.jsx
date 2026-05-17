import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:shadow-primary/40',
  secondary:
    'border border-white/12 bg-white/5 text-white backdrop-blur-sm hover:border-primary-light/40 hover:bg-white/10',
  ghost: 'text-muted hover:text-white hover:bg-white/5',
  outline:
    'border border-primary/40 text-primary-light hover:bg-primary/10 hover:border-primary-light/60',
  dark: 'bg-surface text-white border border-white/8 hover:bg-surface-elevated',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-2xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
