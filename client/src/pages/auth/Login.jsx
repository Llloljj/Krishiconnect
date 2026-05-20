import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';
import { api, saveDemoUser, saveUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

const rolePaths = { farmer: '/farmer', company: '/company', fpo: '/fpo' };

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, token } = await api.login({ email, password });
      saveUser(user, token);
      navigate(rolePaths[user.role] || '/farmer');
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
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="mx-auto w-full max-w-md"
    >
      <motion.div variants={fadeUp} custom={0}>
        <h1 className="font-heading text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-muted">Sign in to your KrishiConnect account</p>
      </motion.div>

      <motion.form variants={fadeUp} custom={1} onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/30"
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.form>

      <motion.div variants={fadeUp} custom={3} className="mt-5 grid grid-cols-3 gap-2">
        {['farmer', 'company', 'fpo'].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => {
              saveDemoUser(role);
              navigate(rolePaths[role]);
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold capitalize text-muted transition hover:border-primary/30 hover:bg-primary/10 hover:text-white"
          >
            <Sparkles className="mx-auto mb-1 h-4 w-4 text-primary-light" />
            Demo {role}
          </button>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} custom={4} className="mt-8 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-primary-light hover:underline">
          Sign up
        </Link>
      </motion.p>
    </motion.div>
  );
}
