import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Sprout, TrendingUp, Users } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';
import AnimatedBarChart from '../common/AnimatedBarChart';
import MiniLineChart from '../common/MiniLineChart';

const aiCapabilities = [
  {
    icon: TrendingUp,
    title: 'Demand Forecasting',
    metric: '+18% Q2',
    description: 'Predict buyer demand before you commit acreage.',
  },
  {
    icon: Sprout,
    title: 'Crop Prediction',
    metric: 'Wheat optimal',
    description: 'Soil, weather, and market data for smarter planting.',
  },
  {
    icon: Users,
    title: 'Farmer–Company Matching',
    metric: '94% fit',
    description: 'Compatibility scored on logistics, quality, and history.',
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    metric: '12 alerts',
    description: 'Actionable recommendations delivered in plain language.',
  },
];

export default function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="ai-showcase"
      className="relative overflow-hidden bg-dark py-24 sm:py-32"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Intelligence"
          title="Enterprise-grade agri intelligence"
          description="Demand forecasting, crop prediction, and smart matching — unified in one dark, data-rich command center."
          dark
        />

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {aiCapabilities.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-primary-light/30 hover:bg-white/10"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-primary/30 px-2.5 py-1 text-xs font-bold text-primary-light">
                    {card.metric}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl sm:p-8"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-light">
                Live pipeline
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-white">
                Processing 2.4M data points daily
              </p>
              <div className="mt-6 h-40 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                <AnimatedBarChart
                  data={[30, 45, 38, 62, 55, 78, 68, 85, 72, 90]}
                  barClassName="bg-gradient-to-t from-primary to-primary-light shadow-[0_0_20px_rgba(129,199,132,0.4)]"
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-light">
                Match intelligence
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-white">
                Real-time compatibility engine
              </p>
              <div className="mt-6 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10">
                <MiniLineChart points={[20, 28, 24, 40, 36, 52, 48, 60, 58, 72]} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['Match', 'Forecast', 'Score', 'Alert'].map((label, i) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-center ring-1 ring-white/10"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary-light">
                      {['Active', 'Updated', '94%', 'Clear'][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
