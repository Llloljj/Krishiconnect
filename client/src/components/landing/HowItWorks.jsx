import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, Sparkles, FileCheck } from 'lucide-react';
import { howItWorksSteps } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

const stepIcons = [UserPlus, Sparkles, FileCheck];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="section-padding" ref={ref}>
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title="Three steps to smarter farming"
          description="From registration to signed contracts — a streamlined, AI-guided journey."
        />

        <motion.div
          className="relative mt-20"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="absolute left-0 right-0 top-24 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {howItWorksSteps.map((item, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="relative text-center"
                >
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-surface ring-4 ring-background">
                    <Icon className="h-8 w-8 text-primary-light" />
                    <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-8 font-heading text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base text-muted">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
