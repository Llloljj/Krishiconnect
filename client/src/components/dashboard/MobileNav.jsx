import { Link, useLocation } from 'react-router-dom';

export default function MobileNav({ links }) {
  const { pathname } = useLocation();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-white/6 bg-surface/60 px-4 py-2 backdrop-blur-md lg:hidden">
      {links.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.path;
        return (
          <Link
            key={link.label}
            to={link.path}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
              active ? 'bg-primary/15 text-primary-light' : 'text-muted hover:text-white'
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
