import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Tractor, Building2, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { roles } from '../../constants/landing';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';
import SectionHeader from '../ui/SectionHeader';

const roleIcons = [Tractor, Building2, Users];

export default function RoleSelection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="roles" className="section-padding bg-surface/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Ecosystem"
          title="Built for every stakeholder"
          description="Farmers, companies, and FPOs — connected through one intelligent agricultural infrastructure."
        />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {roles.map((role, i) => {
            const Icon = roleIcons[i];
            return (
              <motion.article
                key={role.id}
                variants={fadeUp}
                className="group flex flex-col rounded-3xl border border-white/8 bg-white/[0.03] p-8 transition hover:border-primary/25 hover:bg-white/[0.06]"
                whileHover={{ y: -8 }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary-light">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-white">{role.title}</h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                  {role.description}
                </p>
                <Link
                  to={role.path}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition group-hover:gap-3"
                >
                  {role.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
