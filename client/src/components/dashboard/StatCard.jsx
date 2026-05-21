export default function StatCard({ icon: Icon, label, value, trend, trendUp = true }) {
  return (
    <div className="rounded-3xl border nature-border bg-gradient-to-br from-primary/8 to-primary-light/3 p-7 backdrop-blur-sm transition nature-card hover-lift">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/10 text-primary-light">
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              trendUp
                ? 'bg-primary-light/20 text-primary-light'
                : 'bg-red-500/15 text-red-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-5 text-sm text-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
