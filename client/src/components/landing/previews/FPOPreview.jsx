import { Users, FileCheck, MapPin, Landmark } from 'lucide-react';
import AnimatedBarChart from '../../common/AnimatedBarChart';

export default function FPOPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
        {[
          { label: 'Member farmers', value: '842', icon: Users },
          { label: 'Bulk contracts', value: '12', icon: FileCheck },
          { label: 'Regional demand', value: 'High', icon: MapPin },
          { label: 'Schemes tracked', value: '8', icon: Landmark },
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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Scheme tracking</p>
        <ul className="mt-3 space-y-2 text-sm">
          {['PM-KISAN — 98% enrolled', 'Crop insurance — 76%'].map((s) => (
            <li key={s} className="rounded-xl bg-white/5 px-3 py-2 font-medium text-white">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Regional demand</p>
        <div className="mt-3 h-24">
          <AnimatedBarChart data={[38, 52, 45, 68, 60, 74, 70]} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Farmer management</p>
        <ul className="mt-3 space-y-2">
          {['Active members: 842', 'Pending KYC: 23'].map((row) => (
            <li
              key={row}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-white"
            >
              {row}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
