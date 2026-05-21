import { Bell, Search } from 'lucide-react';

export default function DashboardHeader({ title, subtitle, user }) {
  return (
    <header className="flex flex-col gap-4 border-b border-primary-light/15 bg-gradient-to-r from-surface to-surface/80 px-6 py-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-primary-light/20 bg-primary/5 px-3 py-2 sm:flex">
          <Search className="h-4 w-4 text-muted" />
          <input
            type="search"
            placeholder="Search..."
            className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-muted focus:text-white"
          />
        </div>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-primary-light/20 bg-primary/5 text-muted hover:text-primary-light transition"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary-light animate-pulse" />
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-primary-light/20 bg-primary/5 px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-primary-light/20 text-xs font-bold text-primary-light">
            {user.initials}
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-muted">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
