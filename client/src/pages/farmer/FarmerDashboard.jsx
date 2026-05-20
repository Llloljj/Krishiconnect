import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  TrendingUp,
  FileCheck,
  CloudSun,
  IndianRupee,
  Landmark,
} from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import DataTable from '../../components/dashboard/DataTable';
import AIAssistant from '../../components/dashboard/AIAssistant';
import { api, getUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

const defaultContracts = [
  { id: 1, cells: ['AgriCorp Ltd', 'Wheat 50T', 'Active', '₹12.4L'] },
  { id: 2, cells: ['FreshMart', 'Tomato 20T', 'Pending', '₹4.2L'] },
];

export default function FarmerDashboard() {
  const user = getUser();
  const [dashboard, setDashboard] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    let active = true;

    Promise.allSettled([api.getFarmerDashboard(), api.getFarmers(), api.getFields()]).then(
      ([dashboardResult, farmersResult, fieldsResult]) => {
        if (!active) return;

        const nextDashboard =
          dashboardResult.status === 'fulfilled' ? dashboardResult.value : null;
        const farmers = farmersResult.status === 'fulfilled' ? farmersResult.value : [];
        const nextFields = fieldsResult.status === 'fulfilled' ? fieldsResult.value : [];
        const currentFarmer =
          farmers.find((farmer) => farmer.email && farmer.email === user?.email) ??
          farmers.find((farmer) => farmer.name && farmer.name === user?.full_name) ??
          farmers[0] ??
          null;

        setDashboard(nextDashboard);
        setFarmerProfile(currentFarmer);
        setFields(
          currentFarmer?.id
            ? nextFields.filter((field) => !field.farmer_id || field.farmer_id === currentFarmer.id)
            : nextFields,
        );
      },
    );

    return () => {
      active = false;
    };
  }, [user?.email, user?.full_name]);

  const crop = dashboard?.cropRecommendation ?? 'Wheat';
  const contracts =
    dashboard?.contracts?.map((c, i) => ({
      id: i,
      cells: [c.buyer, c.crop, c.status, c.value],
    })) ?? defaultContracts;

  const schemes =
    dashboard?.schemes?.map((s) => `${s.name} — ${s.status}`) ??
    ['PM-KISAN — Eligible', 'Crop Insurance — Recommended'];

  const assistantContext = {
    farmer: farmerProfile ?? {
      name: user?.full_name ?? 'Ramesh Patil',
      location: 'Nashik',
      state: 'Maharashtra',
      land_size_acres: 12,
      soil_type: 'loamy',
      irrigation: 'drip',
      previous_crops: ['wheat', 'tomato'],
      farming_type: 'contract',
      transport_available: true,
      organic: false,
      harvest_timeline: 'April',
    },
    fields,
    weather: dashboard?.weather ?? {
      location: 'Nashik, Maharashtra',
      temperature_c: 28,
      condition: 'Partly cloudy',
      rain_chance_percent: 60,
      insight: 'Light rain expected Thursday - reduce irrigation by 20% and protect harvested grain.',
    },
    market: {
      cropRecommendation: dashboard?.cropRecommendation ?? crop,
      cropInsight: dashboard?.cropInsight,
      marketDemand: dashboard?.marketDemand ?? 'High',
      marketChange: dashboard?.marketChange ?? '+18%',
      avgPrice: dashboard?.avgPrice ?? 'Rs 2,840/q',
    },
    schemes: dashboard?.schemes ?? [],
    contracts: dashboard?.contracts ?? [],
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <DashboardHeader
        title="Farmer Dashboard"
        subtitle={`Welcome${user?.full_name ? `, ${user.full_name}` : ''} — Nashik, Maharashtra`}
        user={{
          name: user?.full_name ?? 'Ramesh Patil',
          role: 'Farmer',
          initials: (user?.full_name ?? 'RP').slice(0, 2).toUpperCase(),
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
            to="/farmer/register"
            className="rounded-xl border border-primary/30 bg-primary/15 px-4 py-2 text-sm font-semibold text-primary-light transition hover:bg-primary/25"
          >
            Complete farmer profile
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Sprout} label="AI crop recommendation" value={crop} trend="Optimal" />
          <StatCard
            icon={TrendingUp}
            label="Market demand"
            value={dashboard?.marketDemand ?? 'High'}
            trend={dashboard?.marketChange ?? '+18%'}
          />
          <StatCard icon={FileCheck} label="Active contracts" value={String(contracts.length)} trend="Live" />
          <StatCard
            icon={IndianRupee}
            label="Avg. crop price"
            value={dashboard?.avgPrice ?? '₹2,840/q'}
            trend="+6%"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard
              title="Market demand"
              subtitle="Wheat — regional outlook"
              data={[42, 55, 48, 62, 58, 70, 65, 78, 72]}
            />
          </div>
          <AIAssistant profile={{ assistantContext }} />
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
                <p className="font-heading text-2xl font-bold text-white">
                  {dashboard?.weather?.temperature_c ?? 28}°C •{' '}
                  {dashboard?.weather?.condition ?? 'Partly cloudy'}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              {dashboard?.weather?.insight ??
                'Light rain expected Thursday — ideal for wheat growth. Reduce irrigation.'}
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
