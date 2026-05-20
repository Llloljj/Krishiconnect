import AnimatedBarChart from '../common/AnimatedBarChart';
import MiniLineChart from '../common/MiniLineChart';

export default function ChartCard({ title, subtitle, type = 'bar', data, linePoints }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      {subtitle && <p className="mt-1 text-sm font-semibold text-white">{subtitle}</p>}
      <div className="mt-4 h-36">
        {type === 'bar' ? (
          <AnimatedBarChart data={data} />
        ) : (
          <MiniLineChart points={linePoints} />
        )}
      </div>
    </div>
  );
}
