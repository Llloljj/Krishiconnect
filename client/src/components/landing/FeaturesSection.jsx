import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  LineChart,
  Mic2,
  Landmark,
  BarChart2,
  FileSignature,
} from 'lucide-react';
import { features } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

const featureIcons = [Brain, LineChart, Mic2, Landmark, BarChart2, FileSignature];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" className="py-24 sm:py-32" ref={ref}>
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform Features"
          title="Built for the field and the boardroom"
          description="Six core capabilities that power transparent, AI-driven contract farming at scale."
        />

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                className="group rounded-3xl glass p-8 transition hover:shadow-2xl hover:shadow-primary/5"
                whileHover={{ y: -8 }}
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 transition group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-bold text-dark">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
