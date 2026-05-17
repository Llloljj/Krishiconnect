import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { coreFeatures } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

export default function CoreFeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const tier1 = coreFeatures.filter((f) => f.tier === 1);
  const tier2 = coreFeatures.filter((f) => f.tier === 2);

  return (
    <section id="features" className="section-padding bg-surface/40" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Core Features"
          title="Built for real agricultural workflows"
          description="Every feature maps to a real problem in India's contract farming ecosystem."
        />

        <motion.div
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {tier1.map((feature) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              className={`relative rounded-3xl border p-8 transition ${
                feature.highlight
                  ? 'border-primary/30 bg-gradient-to-br from-primary/15 to-transparent ring-1 ring-primary/20'
                  : 'border-white/8 bg-white/[0.03] hover:border-white/15'
              }`}
            >
              {feature.highlight && (
                <span className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-light">
                  <Star className="h-3 w-3 fill-current" />
                  Core
                </span>
              )}
              <h3 className="font-heading text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              {feature.highlight && (
                <p className="mt-4 font-heading text-2xl font-bold text-primary-light">
                  Farmer Match Score: 87%
                </p>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          className="mt-16 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          High-value capabilities
        </motion.p>

        <motion.div
          className="mt-8 grid gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {tier2.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5"
            >
              <h3 className="font-heading text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
