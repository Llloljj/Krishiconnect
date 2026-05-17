import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Tractor, Building2, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { authRoles } from '../../constants/landing';
import { fadeUp } from '../../utils/motionVariants';

const roleIcons = { farmer: Tractor, company: Building2, fpo: Users };
const rolePaths = { farmer: '/farmer', company: '/company', fpo: '/fpo' };

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'farmer';
  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(rolePaths[role] || '/farmer');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="mx-auto w-full max-w-md"
    >
      <motion.div variants={fadeUp} custom={0}>
        <h1 className="font-heading text-3xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-muted">Join India&apos;s AI-powered contract farming platform</p>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} className="mt-8">
        <p className="mb-3 text-sm font-medium text-muted">I am a</p>
        <div className="grid grid-cols-3 gap-2">
          {authRoles.map((r) => {
            const Icon = roleIcons[r.id];
            const selected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center rounded-2xl border p-4 text-center transition ${
                  selected
                    ? 'border-primary/40 bg-primary/15 text-primary-light'
                    : 'border-white/10 bg-white/5 text-muted hover:border-white/20'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-2 text-xs font-semibold">{r.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.form variants={fadeUp} custom={2} onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-muted">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
              required
              minLength={8}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Create account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.form>

      <motion.button
        variants={fadeUp}
        custom={3}
        type="button"
        onClick={() => navigate(rolePaths[role] || '/farmer')}
        className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </motion.button>

      <motion.p variants={fadeUp} custom={4} className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-light hover:underline">
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  );
}
