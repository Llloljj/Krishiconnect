import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../../utils/motionVariants';
import { trustIndicators } from '../../constants/landing';
import Button from '../ui/Button';
import HeroDashboardMockup from './HeroDashboardMockup';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden gradient-hero grid-bg">
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full gradient-glow blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[100px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(129,199,132,0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(46,125,50,0.1) 0%, transparent 35%)`,
        }}
      />

      <motion.div className="relative mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-light backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-primary-light animate-pulse" />
              AI Agriculture Infrastructure
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-8 font-heading text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              AI-Powered{' '}
              <span className="text-gradient">Contract Farming</span>{' '}
              Platform
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              Intelligently connecting farmers, companies, and FPOs through AI
              matching, demand visibility, smart contracts, and voice assistance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/signup" variant="primary" size="lg">
                Start Platform
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#dashboards" variant="secondary" size="lg">
                <Play className="h-4 w-4 text-primary-light" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              custom={4}
              className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8"
            >
              {trustIndicators.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-light" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <HeroDashboardMockup />
        </div>
      </motion.div>
    </section>
  );
}
