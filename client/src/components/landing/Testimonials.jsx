import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted across the value chain"
          description="Real stories from farmers, procurement leaders, and FPO directors."
        />

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={fadeUp}
              className="flex flex-col rounded-3xl border border-white/8 bg-white/[0.04] p-8 transition hover:border-white/12 hover:bg-white/[0.06]"
            >
              <p className="flex-1 text-base leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8 flex items-center gap-4 border-t border-white/8 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary-light">
                  {t.initials}
                </span>
                <div>
                  <cite className="not-italic font-semibold text-white">{t.name}</cite>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
