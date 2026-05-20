import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, IndianRupee, ShieldCheck, Target, Truck } from 'lucide-react';
import { api } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

export default function CompanyMatches() {
  const { requirementId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getMatches(requirementId)
      .then(setData)
      .catch((err) => setError(err.message));
  }, [requirementId]);

  if (error) {
    return (
      <div className="p-8 text-red-400">
        {error}
        <Link to="/company" className="mt-4 block text-primary-light">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (!data) {
    return <div className="p-8 text-muted">Loading AI matches...</div>;
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
      <Link
        to="/company"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary-light" />
          <h1 className="font-heading text-2xl font-bold text-white">AI farmer matches</h1>
        </div>
        <p className="mt-2 text-muted">
          {data.requirement.company_name} needs {data.requirement.crop_required} (
          {data.requirement.quantity_tonnes}T) in {data.requirement.preferred_region}
        </p>
      </motion.div>

      <div className="mt-8 space-y-4">
        {data.matches.map((match) => (
          <motion.div
            key={match.farmer_id}
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-heading text-lg font-bold text-white">{match.farmer_name}</p>
                <p className="text-sm text-muted">
                  {match.crop} in {match.region}
                </p>
              </div>
              <span className="rounded-full bg-primary/30 px-4 py-1 text-lg font-bold text-primary-light">
                {match.score}%
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <IndianRupee className="mb-2 h-4 w-4 text-primary-light" />
                <p className="text-xs uppercase tracking-wider text-muted">Revenue potential</p>
                <p className="mt-1 font-heading text-lg font-bold text-white">
                  Rs{' '}
                  {match.profitability_estimate?.estimated_revenue_inr?.toLocaleString('en-IN') ??
                    '42,000'}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mb-2 h-4 w-4 text-primary-light" />
                <p className="text-xs uppercase tracking-wider text-muted">Confidence</p>
                <p className="mt-1 font-heading text-lg font-bold text-white">
                  {match.confidence ?? match.score}%
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Truck className="mb-2 h-4 w-4 text-primary-light" />
                <p className="text-xs uppercase tracking-wider text-muted">Risk</p>
                <p className="mt-1 font-heading text-lg font-bold capitalize text-white">
                  {match.risk_level ?? 'low'}
                </p>
              </div>
            </div>

            <p className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary-light">
              {match.recommendation_summary}
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {match.reasons.map((reason) => (
                <li key={reason}>- {reason}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
