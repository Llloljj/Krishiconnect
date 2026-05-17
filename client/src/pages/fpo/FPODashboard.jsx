import { motion } from 'framer-motion';
import { Users, FileCheck, MapPin, Landmark, BarChart3 } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ChartCard from '../../components/dashboard/ChartCard';
import DataTable from '../../components/dashboard/DataTable';
import { fadeUp } from '../../utils/motionVariants';

const schemes = [
  { id: 1, cells: ['PM-KISAN', '842 members', '98%', 'Active'] },
  { id: 2, cells: ['Crop Insurance', '640 members', '76%', 'Enrolling'] },
  { id: 3, cells: ['Soil Health Card', '512 members', '61%', 'Pending'] },
];

export default function FPODashboard() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <DashboardHeader
        title="FPO Dashboard"
        subtitle="Punjab Farmers Collective — 842 members"
        user={{ name: 'Vikram Singh', role: 'FPO Director', initials: 'VS' }}
      />

      <motion.div
        className="flex-1 space-y-6 p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Users} label="Member farmers" value="842" trend="+12" />
          <StatCard icon={FileCheck} label="Bulk contracts" value="12" trend="4 active" />
          <StatCard icon={MapPin} label="Regional demand" value="High" trend="Wheat" />
          <StatCard icon={Landmark} label="Schemes tracked" value="8" trend="3 new" />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Regional demand"
            subtitle="Crop-wise procurement index"
            data={[38, 52, 45, 68, 60, 74, 70, 82, 76]}
          />
          <div className="rounded-3xl border border-white/8 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-light" />
              <p className="text-sm font-semibold text-white">Regional analytics</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Avg. yield uplift', value: '+14%' },
                { label: 'Contract value', value: '₹1.8Cr' },
                { label: 'On-time delivery', value: '96%' },
                { label: 'Member NPS', value: '72' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="mt-1 font-heading text-xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <DataTable
            title="Scheme tracking"
            columns={['Scheme', 'Coverage', 'Enrollment', 'Status']}
            rows={schemes}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
