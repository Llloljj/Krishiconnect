import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sprout, Leaf } from 'lucide-react';
import { navLinks } from '../../constants/landing';
import Button from '../ui/Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass-strong shadow-lg shadow-black/15' : 'glass-plant'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.span 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/10 text-primary-light ring-1 ring-primary-light/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sprout className="h-5 w-5" strokeWidth={2.2} />
            </motion.div>
          </motion.span>
          <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
            Krishi<span className="text-primary-light">Connect</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-all hover:text-primary-light hover:scale-105 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-light to-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/login" variant="ghost" size="sm">
            Login
          </Button>
          <Button to="/signup" variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-light/20 bg-primary/5 text-primary-light hover:bg-primary/10 lg:hidden transition-all"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl glass-plant p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-primary/10 hover:text-primary-light transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <motion.div className="mt-4 flex flex-col gap-2">
              <Button to="/login" variant="secondary" size="md" className="w-full">
                Login
              </Button>
              <Button to="/signup" variant="primary" size="md" className="w-full">
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
