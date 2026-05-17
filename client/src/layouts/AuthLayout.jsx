import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { images } from '../constants/theme';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="relative hidden w-1/2 lg:block">
        <img
          src={images.heroFarm}
          alt="Agricultural landscape"
          className="h-full w-full object-cover"
        />
        <div className="image-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
              KrishiConnect
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-white">
              AI-Powered Agriculture Infrastructure
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Connect farmers, companies, and FPOs through intelligent matching and
              transparent contracts.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <Link to="/" className="mb-10 flex items-center gap-2.5 lg:hidden">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary-light">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="font-heading text-xl font-bold text-white">
            Krishi<span className="text-primary-light">Connect</span>
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
