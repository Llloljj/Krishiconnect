import { Link, useLocation } from 'react-router-dom';

export default function MobileNav({ links }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-white/8 bg-surface/90 px-4 py-2 backdrop-blur-md lg:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.path;
        return (
          <Link
            key={link.label}
            to={link.path}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
              active ? 'bg-primary/15 text-primary-light' : 'text-muted'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
