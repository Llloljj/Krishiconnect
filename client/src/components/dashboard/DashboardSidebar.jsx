import { Link, useLocation } from 'react-router-dom';
import { Sprout, Home, LogOut } from 'lucide-react';

export default function DashboardSidebar({ links, title }) {
  const { pathname } = useLocation();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/8 bg-surface">
      <Link to="/" className="flex items-center gap-2.5 border-b border-white/8 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
          <Sprout className="h-4 w-4" />
        </span>
        <span className="font-heading text-lg font-bold text-white">
          Krishi<span className="text-primary-light">Connect</span>
        </span>
      </Link>

      <p className="px-6 pt-5 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>

      <nav className="mt-3 flex-1 space-y-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-primary/15 text-primary-light'
                  : 'text-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/8 p-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
        <Link
          to="/login"
          className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
