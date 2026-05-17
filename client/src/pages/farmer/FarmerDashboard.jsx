import { motion } from 'framer-motion';
import {
  Sprout,
  TrendingUp,
  FileCheck,
  CloudSun,
  Mic,
  IndianRupee,
  Landmark,
} from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import DataTable from '../../components/dashboard/DataTable';
import { fadeUp } from '../../utils/motionVariants';

const contracts = [
  { id: 1, cells: ['AgriCorp Ltd', 'Wheat 50T', 'Active', '₹12.4L'] },
  { id: 2, cells: ['FreshMart', 'Tomato 20T', 'Pending', '₹4.2L'] },
  { id: 3, cells: ['GrainHub', 'Rice 30T', 'Active', '₹8.1L'] },
];

const schemes = ['PM-KISAN — Eligible', 'Crop Insurance — Recommended', 'Soil Health Card — Pending'];

export default function FarmerDashboard() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <DashboardHeader
        title="Farmer Dashboard"
        subtitle="Welcome back, Ramesh — Nashik, Maharashtra"
        user={{ name: 'Ramesh Patil', role: 'Farmer', initials: 'RP' }}
      />

      <motion.div
        className="flex-1 space-y-6 p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Sprout} label="AI crop recommendation" value="Wheat" trend="Optimal" />
          <StatCard icon={TrendingUp} label="Market demand" value="High" trend="+18%" />
          <StatCard icon={FileCheck} label="Active contracts" value="3" trend="2 due" />
          <StatCard icon={IndianRupee} label="Avg. crop price" value="₹2,840/q" trend="+6%" />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard
              title="Market demand"
              subtitle="Wheat — regional outlook"
              data={[42, 55, 48, 62, 58, 70, 65, 78, 72]}
            />
          </div>

          <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 to-primary/5 p-6">
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary-light" />
              <span className="font-semibold text-white">Voice Assistant</span>
            </div>
            <p className="mt-4 text-sm text-muted">
              &ldquo;What government schemes am I eligible for?&rdquo;
            </p>
            <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
              You may qualify for PM-KISAN and crop insurance. Tap to apply.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Start voice session
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Crop pricing"
            subtitle="Last 30 days"
            type="line"
            linePoints={[22, 26, 24, 28, 30, 27, 32, 34, 33]}
          />
          <div className="rounded-3xl border border-white/8 bg-white/5 p-6">
            <div className="flex items-center gap-3">
              <CloudSun className="h-8 w-8 text-primary-light" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Weather insights
                </p>
                <p className="font-heading text-2xl font-bold text-white">28°C • Partly cloudy</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              Light rain expected Thursday — ideal for wheat growth stage. Irrigation
              recommended low.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/8 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary-light" />
              <p className="text-sm font-semibold text-white">Scheme recommendations</p>
            </div>
            <ul className="mt-4 space-y-2">
              {schemes.map((scheme) => (
                <li
                  key={scheme}
                  className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-muted"
                >
                  {scheme}
                </li>
              ))}
            </ul>
          </div>
          <DataTable
            title="Active contracts"
            columns={['Buyer', 'Crop', 'Status', 'Value']}
            rows={contracts}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
