import AnimatedBarChart from '../common/AnimatedBarChart';
import MiniLineChart from '../common/MiniLineChart';

export default function ChartCard({ title, subtitle, type = 'bar', data, linePoints }) {
  return (
    <div className="rounded-3xl border nature-border bg-gradient-to-br from-primary/8 to-primary-light/3 p-7 backdrop-blur-sm transition nature-card hover-lift">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      {subtitle && <p className="mt-2 text-sm font-semibold text-white">{subtitle}</p>}
      <div className="mt-5 h-36">
        {type === 'bar' ? (
          <AnimatedBarChart data={data} />
        ) : (
          <MiniLineChart points={linePoints} />
        )}
      </div>
    </div>
  );
}
