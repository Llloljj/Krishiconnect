import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Button from '../ui/Button';
import { images } from '../../constants/theme';

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl cinematic-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={images.droneAgri}
            alt="Drone agriculture technology"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="image-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.2),transparent_70%)]" />

          <div className="relative px-8 py-24 text-center sm:px-16 sm:py-28">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transform Agriculture Through AI
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Join thousands of farmers, companies, and FPOs building a transparent,
              profitable agricultural future.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/signup" variant="primary" size="lg" className="w-full sm:w-auto">
                Start Platform
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="#dashboards"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Play className="h-4 w-4 text-primary-light" />
                Watch Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
