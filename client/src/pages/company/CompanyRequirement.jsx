import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import { api, getUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

export default function CompanyRequirement() {
  const navigate = useNavigate();
  const user = getUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company_name: '',
    contact_email: user?.email ?? '',
    crop_required: 'wheat',
    quantity_tonnes: '',
    preferred_region: 'Maharashtra',
    preferred_soil: 'loamy',
    contract_duration_months: '6',
    price_range_min: '',
    price_range_max: '',
    pickup_logistics: 'Company pickup from farm gate',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await api.postRequirement({
        ...form,
        profile_id: user?.id ?? null,
        quantity_tonnes: Number(form.quantity_tonnes),
        contract_duration_months: Number(form.contract_duration_months),
        price_range_min: Number(form.price_range_min) || null,
        price_range_max: Number(form.price_range_max) || null,
      });
      navigate(`/company/matches/${result.id}`);
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
          <h1 className="font-heading text-3xl font-bold text-white">Post crop requirement</h1>
          <p className="mt-2 text-muted">
            Companies post demand — our AI engine matches verified farmers instantly.
          </p>
        </motion.div>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-8 space-y-5">
          {[
            ['company_name', 'Company name', 'text'],
            ['contact_email', 'Contact email', 'email'],
            ['crop_required', 'Crop required', 'text'],
            ['quantity_tonnes', 'Quantity (tonnes)', 'number'],
            ['preferred_region', 'Preferred region', 'text'],
            ['preferred_soil', 'Preferred soil type', 'text'],
            ['contract_duration_months', 'Contract duration (months)', 'number'],
            ['price_range_min', 'Min price (₹/quintal)', 'number'],
            ['price_range_max', 'Max price (₹/quintal)', 'number'],
            ['pickup_logistics', 'Pickup / logistics', 'text'],
          ].map(([key, label, type]) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium text-muted">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                required={['company_name', 'crop_required', 'quantity_tonnes'].includes(key)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-primary/40"
              />
            </div>
          ))}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Posting…' : 'Post requirement & find farmers'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
