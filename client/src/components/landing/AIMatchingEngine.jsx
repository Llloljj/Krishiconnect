import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';
import { matchFactors } from '../../constants/landing';
import { fadeUp } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';
import ProgressRing from '../common/ProgressRing';
import AnimatedBarChart from '../common/AnimatedBarChart';

export default function AIMatchingEngine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="ai-matching"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Innovation"
          title="AI Matching Engine"
          description="Multi-dimensional compatibility scoring — soil, climate, logistics, capacity, and proximity — in milliseconds."
        />

        <motion.div
          className="mt-20 overflow-hidden rounded-3xl cinematic-border border border-white/10 bg-gradient-to-br from-surface to-background p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col items-center">
              <ProgressRing score={87} size={200} stroke={12} label="Farmer Match" />
              <motion.div
                className="mt-8 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <Zap className="h-4 w-4 text-primary-light" />
                <span className="text-sm font-semibold text-primary-light">
                  AgriCorp × Ramesh Patil — Wheat 50T
                </span>
              </motion.div>
            </div>

            <motion.div
              className="space-y-5"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {matchFactors.map((factor) => (
                <motion.div key={factor.label} variants={fadeUp}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted">{factor.label}</span>
                    <span className="font-semibold text-white">{factor.score}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: factor.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${factor.score}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                className="mt-8 rounded-2xl border border-white/8 bg-white/5 p-5"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary-light" />
                  <span className="text-sm font-semibold text-white">Production estimate</span>
                </div>
                <p className="mt-2 text-2xl font-heading font-bold text-primary-light">
                  52 tonnes
                  <span className="ml-2 text-sm font-normal text-muted">±4% confidence</span>
                </p>
                <div className="mt-4 h-24">
                  <AnimatedBarChart
                    data={[40, 48, 45, 52, 50, 55, 52]}
                    barClassName="bg-gradient-to-t from-primary to-primary-light"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
