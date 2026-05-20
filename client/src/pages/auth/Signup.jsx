import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Tractor, Building2, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { api, saveUser } from '../../services/api';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, token } = await api.signup({
        email,
        password,
        full_name: name,
        role,
      });
      saveUser(user, token);
      navigate(rolePaths[role] || '/farmer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.form>

      <motion.p variants={fadeUp} custom={4} className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-light hover:underline">
          Sign in
        </Link>
      </motion.p>
    </motion.div>
  );
}
