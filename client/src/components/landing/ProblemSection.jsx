import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { problems, problemBullets } from '../../constants/landing';
import { images } from '../../constants/theme';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent organic-pattern" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Problem"
          title="India's supply chain is broken"
          description="Farmers, companies, and FPOs operate in silos — with devastating consequences for rural livelihoods."
        />

        <div className="mt-20 grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl nature-border organic-shadow"
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <img
              src={images.fieldSunset}
              alt="Indian agricultural landscape at sunset"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="image-overlay absolute inset-0" />
            <motion.div
              className="absolute bottom-6 left-6 right-6 glass-plant rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-primary-light">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Supply chain crisis
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">
                140M+ farmers lack direct market access and demand visibility.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div
              className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
              variants={staggerContainer}
            >
              {problems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/8 bg-white/5 p-6"
                >
                  <p className="font-heading text-3xl font-bold text-primary-light">
                    {item.stat}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.ul className="mt-10 space-y-4" variants={fadeUp}>
              {problemBullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  className="flex items-start gap-3 text-muted"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                  <span className="text-base leading-relaxed">{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
