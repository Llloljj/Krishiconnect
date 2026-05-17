import { Sprout, CloudSun, Mic, FileCheck, TrendingUp } from 'lucide-react';
import AnimatedBarChart from '../../common/AnimatedBarChart';

export default function FarmerPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
        {[
          { label: 'Crop recommendation', value: 'Wheat', icon: Sprout },
          { label: 'Market demand', value: 'High', icon: TrendingUp },
          { label: 'Active contracts', value: '3', icon: FileCheck },
          { label: 'Weather', value: '28°C', icon: CloudSun },
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

      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/25 to-primary/5 p-4 lg:col-span-4">
        <div className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary-light" />
          <span className="text-sm font-semibold text-white">Voice Assistant</span>
        </div>
        <p className="mt-3 text-sm text-muted">
          Ask prices, schemes, or contracts in your language.
        </p>
        <p className="mt-2 text-xs text-primary-light">Hindi • Punjabi • Marathi</p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Crop pricing</p>
        <div className="mt-3 h-24">
          <AnimatedBarChart data={[42, 55, 48, 62, 58, 70, 65]} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Active contracts</p>
        <ul className="mt-3 space-y-2">
          {['AgriCorp — Wheat 50T', 'FreshMart — Tomato 20T'].map((c) => (
            <li
              key={c}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm"
            >
              <span className="font-medium text-white">{c}</span>
              <span className="text-xs font-semibold text-primary-light">Active</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
