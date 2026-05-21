import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Tractor, Building2, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import FarmerPreview from './previews/FarmerPreview';
import CompanyPreview from './previews/CompanyPreview';
import FPOPreview from './previews/FPOPreview';

const tabs = [
  { id: 'farmer', label: 'Farmer', icon: Tractor, path: '/farmer' },
  { id: 'company', label: 'Company', icon: Building2, path: '/company' },
  { id: 'fpo', label: 'FPO', icon: Users, path: '/fpo' },
];

const previews = {
  farmer: FarmerPreview,
  company: CompanyPreview,
  fpo: FPOPreview,
};

export default function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState('farmer');
  const ActivePreview = previews[active];
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <section id="dashboards" className="section-padding bg-surface/20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Dashboard Showcase"
          title="Enterprise-grade role dashboards"
          description="Farmer, company, and FPO portals — each designed for clarity, speed, and AI-driven decisions."
        />

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/15'
                    : 'border border-white/8 bg-white/[0.03] text-muted hover:text-white hover:border-white/12'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-3xl cinematic-border"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden bg-[#0a1410] p-4 sm:p-6"
            >
              <ActivePreview />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {activeTab && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to={activeTab.path}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition hover:gap-3"
            >
              Open full {activeTab.label} dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
