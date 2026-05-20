import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { api, getUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

export default function FarmerRegister() {
  const navigate = useNavigate();
  const user = getUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: '',
    location: '',
    state: 'Maharashtra',
    land_size_acres: '',
    soil_type: 'loamy',
    irrigation: 'drip',
    previous_crops: 'wheat, tomato',
    farming_type: 'contract',
    transport_available: true,
    organic: false,
    harvest_timeline: 'April',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.registerFarmer({
        ...form,
        profile_id: user?.id ?? null,
        land_size_acres: Number(form.land_size_acres),
        previous_crops: form.previous_crops.split(',').map((c) => c.trim()),
      });
      navigate('/farmer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="mx-auto w-full max-w-2xl"
      >
        <motion.div variants={fadeUp}>
          <h1 className="font-heading text-3xl font-bold text-white">Farmer registration</h1>
          <p className="mt-2 text-muted">
            Complete your profile for AI matching and contract recommendations.
          </p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-8 space-y-5">
          {[
            ['name', 'Full name', 'text'],
            ['email', 'Email', 'email'],
            ['phone', 'Phone', 'tel'],
            ['location', 'Village / District', 'text'],
            ['state', 'State', 'text'],
            ['land_size_acres', 'Land size (acres)', 'number'],
            ['soil_type', 'Soil type (loamy, black, red…)', 'text'],
            ['irrigation', 'Irrigation (drip, canal, rainfed)', 'text'],
            ['previous_crops', 'Previous crops (comma-separated)', 'text'],
            ['harvest_timeline', 'Harvest timeline', 'text'],
          ].map(([key, label, type]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium text-muted">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                required={key === 'name' || key === 'location'}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-primary/40"
              />
            </div>
          ))}

          <label className="flex items-center gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.transport_available}
              onChange={(e) => update('transport_available', e.target.checked)}
              className="rounded"
            />
            Transport available for delivery
          </label>

          <label className="flex items-center gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={form.organic}
              onChange={(e) => update('organic', e.target.checked)}
              className="rounded"
            />
            Organic farming
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Saving…' : 'Save farmer profile'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
