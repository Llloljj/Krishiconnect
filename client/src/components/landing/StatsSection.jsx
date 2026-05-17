import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, FileCheck, Building2, Wheat } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import { stats } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

const icons = [Users, FileCheck, Building2, Wheat];

function StatCard({ stat, Icon, inView }) {
  const count = useCountUp(stat.value, 2200, inView);

  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-3xl glass p-8 transition hover:shadow-2xl hover:shadow-primary/5 sm:p-10"
      whileHover={{ y: -6 }}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" />
      </span>
      <p className="mt-6 font-heading text-5xl font-black tracking-tight text-dark sm:text-6xl">
        {inView ? (
          <>
            {stat.value >= 1000
              ? `${Math.floor(count / 1000)}K`
              : count.toLocaleString()}
            {stat.suffix}
          </>
        ) : (
          '0'
        )}
      </p>
      <p className="mt-2 text-base font-medium text-muted">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 sm:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} Icon={icons[i]} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
