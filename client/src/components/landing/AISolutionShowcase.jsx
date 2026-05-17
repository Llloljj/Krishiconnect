import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { aiSolutions } from '../../constants/landing';
import { images } from '../../constants/theme';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

export default function AISolutionShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Solution"
          title="KrishiConnect fixes the chain with AI"
          description="One intelligent platform connecting every stakeholder with demand visibility, matching, and trust."
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative overflow-hidden rounded-3xl cinematic-border lg:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <img
              src={images.smartFarm}
              alt="Smart farming technology"
              className="h-full min-h-[400px] w-full object-cover"
              loading="lazy"
            />
            <motion.div className="image-overlay absolute inset-0" />
            <motion.div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-light ring-1 ring-primary/30">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered
              </span>
              <p className="mt-4 font-heading text-2xl font-bold text-white">
                From fragmented fields to connected ecosystems
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="space-y-4">
              {aiSolutions.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group flex items-center gap-6 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition hover:border-primary/25 hover:bg-white/[0.06]"
                  whileHover={{ x: 4 }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 font-heading text-lg font-bold text-primary-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary-light">
                        {item.metric}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition group-hover:opacity-100 group-hover:text-primary-light" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
