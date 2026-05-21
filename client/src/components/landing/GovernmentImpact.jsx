import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { governmentImpacts } from '../../constants/landing';
import { images } from '../../constants/theme';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

export default function GovernmentImpact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img
          src={images.harvest}
          alt="Agricultural harvest in India"
          className="h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="National Impact"
          title="Empowering rural India at scale"
          description="Aligned with digital agriculture missions — transparency, income growth, and accessibility for every farmer."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {governmentImpacts.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-3xl border border-white/8 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition hover:border-white/12 hover:bg-white/[0.06]"
            >
              <p className="font-heading text-4xl font-bold text-primary-light">{item.stat}</p>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
