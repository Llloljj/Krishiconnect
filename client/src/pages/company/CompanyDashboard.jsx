import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Users, TrendingUp, FileText, Target } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import DataTable from '../../components/dashboard/DataTable';
import { api, getUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

const defaultFarmers = [
  { id: 1, cells: ['Ramesh Patil', 'Wheat', '94%', 'Nashik'] },
  { id: 2, cells: ['Sunita Devi', 'Tomato', '88%', 'Pune'] },
  { id: 3, cells: ['Vikram Singh', 'Rice', '91%', 'Punjab'] },
];

export default function CompanyDashboard() {
  const user = getUser();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.getCompanyDashboard().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  const farmers =
    dashboard?.matches?.map((m, i) => ({
      id: i,
      cells: [m.farmer, m.crop, m.match, m.region],
    })) ?? defaultFarmers;

  const insights = dashboard?.insights ?? [
    'Wheat supply tight in Nashik — act within 14 days',
    'Tomato surplus in Pune — negotiate volume discount',
  ];

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <DashboardHeader
        title="Company Dashboard"
        subtitle="Procurement command center — AgriCorp Ltd"
        user={{
          name: user?.full_name ?? 'Priya Sharma',
          role: 'Procurement Head',
          initials: (user?.full_name ?? 'PS').slice(0, 2).toUpperCase(),
        }}
      />

      <motion.div
        className="flex-1 space-y-6 p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <Link
            to="/company/requirement"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Post new requirement
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Package}
            label="Procurement volume"
            value={dashboard?.procurementVolume ?? '2.4K T'}
            trend="+12%"
          />
          <StatCard
            icon={Users}
            label="Verified farmers"
            value={String(dashboard?.verifiedFarmers ?? 186)}
            trend="Live"
          />
          <StatCard
            icon={TrendingUp}
            label="AI demand prediction"
            value={dashboard?.demandForecast ?? '+22%'}
            trend="Wheat"
          />
          <StatCard
            icon={FileText}
            label="Open contracts"
            value={String(dashboard?.openContracts ?? 24)}
            trend="Active"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Procurement analytics"
            subtitle="Monthly volume (tonnes)"
            data={[50, 62, 58, 75, 68, 82, 78, 90, 85]}
          />
          <ChartCard
            title="AI demand prediction"
            subtitle="Q2 procurement forecast"
            type="line"
            linePoints={[18, 24, 22, 35, 32, 48, 44, 58, 55, 62]}
          />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/8 bg-white/5 p-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-light" />
              <p className="text-sm font-semibold text-white">Smart sourcing insights</p>
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {insights.map((tip) => (
                <li key={tip} className="rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-muted">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <DataTable
              title="Farmer discovery — AI matching"
              columns={['Farmer', 'Crop', 'Match', 'Region']}
              rows={farmers}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
