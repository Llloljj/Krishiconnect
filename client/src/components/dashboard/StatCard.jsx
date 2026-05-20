export default function StatCard({ icon: Icon, label, value, trend, trendUp = true }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
          <Icon className="h-5 w-5" />
        </span>
        {trend && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              trendUp
                ? 'bg-primary/15 text-primary-light'
                : 'bg-red-500/15 text-red-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 font-heading text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
