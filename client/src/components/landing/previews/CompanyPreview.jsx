import { Users, TrendingUp, Package, FileText } from 'lucide-react';
import AnimatedBarChart from '../../common/AnimatedBarChart';
import MiniLineChart from '../../common/MiniLineChart';

export default function CompanyPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
        {[
          { label: 'Procurement volume', value: '2.4K T', icon: Package },
          { label: 'Verified farmers', value: '186', icon: Users },
          { label: 'Demand forecast', value: '+22%', icon: TrendingUp },
          { label: 'Open contracts', value: '24', icon: FileText },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/8 bg-white/5 p-4"
            >
              <Icon className="h-4 w-4 text-primary-light" />
              <p className="mt-3 text-[10px] uppercase tracking-wider text-muted">{item.label}</p>
              <p className="mt-1 font-heading text-xl font-bold text-white">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">AI demand prediction</p>
        <div className="mt-2">
          <MiniLineChart points={[18, 24, 22, 35, 32, 48, 44, 58, 55]} />
        </div>
        <p className="mt-2 text-sm font-semibold text-primary-light">Wheat procurement up 22%</p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Supply insights</p>
        <div className="mt-3 h-24">
          <AnimatedBarChart data={[50, 62, 58, 75, 68, 82, 78]} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Farmer discovery</p>
        <ul className="mt-3 space-y-2">
          {['Nashik cluster — 94% match', 'Punjab wheat belt — 88% match'].map((c) => (
            <li
              key={c}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
            >
              <span className="font-medium text-white">{c}</span>
              <span className="text-xs font-semibold text-primary-light">View</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
