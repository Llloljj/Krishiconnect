import { motion } from 'framer-motion';
import { BarChart3, Sparkles, TrendingUp, MapPin } from 'lucide-react';
import AnimatedBarChart from '../common/AnimatedBarChart';
import MiniLineChart from '../common/MiniLineChart';

export default function HeroDashboardMockup() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-primary-light/5 blur-2xl" />

      <motion.div
        className="relative cinematic-border overflow-hidden rounded-3xl"
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="relative bg-[#0a0a0a] p-5 sm:p-6 lg:p-7">
          <motion.div className="flex items-center justify-between border-b border-white/8 pb-4">
            <motion.div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            </motion.div>
            <span className="text-xs font-medium text-muted">KrishiConnect Intelligence</span>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-semibold text-primary-light ring-1 ring-primary/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
              Live
            </span>
          </motion.div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Farmer Match', value: '87%', icon: Sparkles },
              { label: 'Demand Index', value: '+24%', icon: TrendingUp },
              { label: 'Active Buyers', value: '142', icon: BarChart3 },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4 text-primary-light" />
                    <span className="text-[10px] uppercase tracking-wider text-muted">
                      {stat.label}
                    </span>
                  </div>
                  <p className="mt-2 font-heading text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-5">
            <motion.div
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8 lg:col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted">
                    Demand forecasting
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">Wheat • Q2 outlook</p>
                </div>
                <span className="rounded-lg bg-primary/20 px-2 py-1 text-xs font-bold text-primary-light">
                  +18%
                </span>
              </div>
              <motion.div className="mt-3 h-28">
                <AnimatedBarChart
                  data={[35, 52, 48, 72, 58, 88, 76, 92, 68]}
                  barClassName="bg-gradient-to-t from-primary via-primary-light to-lime/80"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/8 lg:col-span-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-[10px] uppercase tracking-wider text-muted">Market trend</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Procurement velocity</p>
              <motion.div className="mt-2">
                <MiniLineChart points={[12, 18, 15, 28, 24, 35, 42, 38, 48]} />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-3 flex items-center justify-between rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 to-transparent px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/25 text-primary-light">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">AI Match ready</p>
                <p className="text-[10px] text-muted">AgriCorp × Nashik cluster • 87% fit</p>
              </div>
            </div>
            <span className="rounded-xl bg-primary/20 px-3 py-1.5 text-xs font-bold text-primary-light">
              Proceed
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
