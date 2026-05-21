import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  MapPin,
  FileCheck,
  CloudSun,
  Landmark,
  Tractor,
  AlertCircle,
  Leaf,
  Droplets,
  ArrowRight,
} from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import DataTable from '../../components/dashboard/DataTable';
import AIAssistant from '../../components/dashboard/AIAssistant';
import { api, getUser } from '../../services/api';
import { fadeUp } from '../../utils/motionVariants';

function Panel({ title, icon: Icon, children, className = '' }) {
  return (
    <div
      className={`rounded-3xl border nature-border bg-gradient-to-br from-primary/8 to-primary-light/3 p-6 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5 shrink-0 text-primary-light" />}
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</p>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function EmptyHint({ message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-5 text-sm text-muted">
      <p>{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-1 font-semibold text-primary-light transition hover:text-white"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function healthBadge(status) {
  const normalized = (status ?? 'unknown').toLowerCase();
  const styles = {
    healthy: 'bg-primary-light/20 text-primary-light',
    monitoring: 'bg-amber-500/15 text-amber-400',
    stressed: 'bg-red-500/15 text-red-400',
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        styles[normalized] ?? 'bg-white/10 text-muted'
      }`}
    >
      {normalized}
    </span>
  );
}

export default function FarmerDashboard() {
  const user = getUser();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [fields, setFields] = useState([]);
  const [matches, setMatches] = useState([]);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      api.getFarmerDashboard(),
      api.getFarmers(),
      api.getFields(),
      api.getAllMatches(),
    ]).then(([dashboardResult, farmersResult, fieldsResult, matchesResult]) => {
      if (!active) return;

      const nextDashboard =
        dashboardResult.status === 'fulfilled' ? dashboardResult.value : null;
      const farmers = farmersResult.status === 'fulfilled' ? farmersResult.value : [];
      const allFields = fieldsResult.status === 'fulfilled' ? fieldsResult.value : [];
      const allMatches = matchesResult.status === 'fulfilled' ? matchesResult.value : [];

      const currentFarmer =
        farmers.find((f) => f.email && f.email === user?.email) ??
        farmers.find((f) => f.name && f.name === user?.full_name) ??
        null;

      const farmerFields = currentFarmer?.id
        ? allFields.filter((field) => !field.farmer_id || field.farmer_id === currentFarmer.id)
        : [];

      const farmerMatches = Array.isArray(allMatches)
        ? allMatches.filter(
            (m) =>
              currentFarmer?.name &&
              (m.farmer === currentFarmer.name ||
                m.farmer_name === currentFarmer.name ||
                String(m.farmer_id) === String(currentFarmer.id)),
          )
        : [];

      setDashboard(nextDashboard);
      setFarmerProfile(currentFarmer);
      setFields(farmerFields);
      setMatches(farmerMatches);
      setLoading(false);

      if (currentFarmer) {
        const crop =
          farmerFields[0]?.crop_type ??
          nextDashboard?.cropRecommendation ??
          currentFarmer.previous_crops?.[0];

        api
          .getSchemes({
            state: currentFarmer.state,
            crop,
            land_acres: currentFarmer.land_size_acres,
          })
          .then((data) => {
            if (active) setSchemes(Array.isArray(data) ? data : data?.schemes ?? []);
          })
          .catch(() => {
            if (active) setSchemes(nextDashboard?.schemes ?? []);
          });
      } else if (nextDashboard?.schemes) {
        setSchemes(nextDashboard.schemes);
      }
    });

    return () => {
      active = false;
    };
  }, [user?.email, user?.full_name]);

  const profileComplete = Boolean(farmerProfile?.location && farmerProfile?.land_size_acres);
  const locationLabel = farmerProfile
    ? [farmerProfile.location, farmerProfile.state].filter(Boolean).join(', ')
    : null;

  const recommendedCrop =
    dashboard?.cropRecommendation ?? fields[0]?.crop_type ?? null;

  const contractRows = useMemo(() => {
    const fromDashboard = dashboard?.contracts?.map((c, i) => ({
      id: `d-${i}`,
      cells: [c.buyer, c.crop, c.status, c.value],
    }));
    if (fromDashboard?.length) return fromDashboard;

    return matches.map((m, i) => ({
      id: `m-${i}`,
      cells: [
        m.company ?? m.company_name ?? 'Buyer',
        m.crop ?? m.crop_required ?? '—',
        m.status ?? `${Math.round(m.match_score ?? m.score ?? 0)}% match`,
        m.price_range ?? m.estimated_value ?? '—',
      ],
    }));
  }, [dashboard?.contracts, matches]);

  const schemeItems = useMemo(() => {
    if (schemes.length) {
      return schemes.map((s, i) => {
        if (typeof s === 'string') return { key: s, label: s };
        return {
          key: s.id ?? s.name ?? i,
          label: s.name ?? s.title ?? 'Scheme',
          detail: s.status ?? s.description ?? s.eligibility,
        };
      });
    }
    return [];
  }, [schemes]);

  const assistantContext = useMemo(
    () => ({
      farmer: farmerProfile,
      fields,
      weather: dashboard?.weather ?? null,
      market: {
        cropRecommendation: recommendedCrop,
        cropInsight: dashboard?.cropInsight,
        marketDemand: dashboard?.marketDemand,
        marketChange: dashboard?.marketChange,
        avgPrice: dashboard?.avgPrice,
      },
      schemes,
      contracts: dashboard?.contracts ?? [],
      matches,
    }),
    [farmerProfile, fields, dashboard, recommendedCrop, schemes, matches],
  );

  const aiProfile = farmerProfile
    ? { assistantContext }
    : { assistantContext: { user, fields } };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <DashboardHeader
        title="Farmer Dashboard"
        subtitle={
          locationLabel
            ? `Welcome${user?.full_name ? `, ${user.full_name}` : ''} — ${locationLabel}`
            : `Welcome${user?.full_name ? `, ${user.full_name}` : ''} — set up your farm profile`
        }
        user={{
          name: user?.full_name ?? 'Farmer',
          role: 'Farmer',
          initials: (user?.full_name ?? 'FM').slice(0, 2).toUpperCase(),
        }}
      />

      <motion.div
        className="flex-1 space-y-6 p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {!profileComplete && (
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <p className="font-semibold text-white">Complete your farmer profile</p>
                <p className="mt-1 text-sm text-muted">
                  Add land, soil, and crop details to unlock AI matching, schemes, and buyer
                  recommendations.
                </p>
              </div>
            </div>
            <Link
              to="/farmer/register"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Register farm profile
            </Link>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={MapPin}
            label="Land holding"
            value={
              farmerProfile?.land_size_acres != null
                ? `${farmerProfile.land_size_acres} acres`
                : '—'
            }
            trend={farmerProfile?.irrigation ? farmerProfile.irrigation : undefined}
            trendUp
          />
          <StatCard
            icon={Tractor}
            label="Registered fields"
            value={loading ? '…' : String(fields.length)}
            trend={fields.length ? 'Tracked' : 'Add fields'}
            trendUp={fields.length > 0}
          />
          <StatCard
            icon={Sprout}
            label="AI crop focus"
            value={recommendedCrop ?? '—'}
            trend={dashboard?.marketDemand}
            trendUp
          />
          <StatCard
            icon={FileCheck}
            label="Buyer matches"
            value={loading ? '…' : String(contractRows.length)}
            trend={contractRows.length ? 'From platform' : 'No matches yet'}
            trendUp={contractRows.length > 0}
          />
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-3">
          <motion.div variants={fadeUp} className="space-y-6 xl:col-span-2">
            {(dashboard?.cropInsight || recommendedCrop) && (
              <Panel title="Crop & market insight" icon={Leaf}>
                {recommendedCrop && (
                  <p className="font-heading text-2xl font-bold text-white">{recommendedCrop}</p>
                )}
                {dashboard?.cropInsight && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{dashboard.cropInsight}</p>
                )}
                {!dashboard?.cropInsight && recommendedCrop && (
                  <p className="mt-3 text-sm text-muted">
                    Ask the AI assistant for sowing, irrigation, and pricing advice for{' '}
                    {recommendedCrop}.
                  </p>
                )}
                {(dashboard?.marketDemand || dashboard?.avgPrice) && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {dashboard.marketDemand && (
                      <span className="rounded-full border border-primary-light/25 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary-light">
                        Demand: {dashboard.marketDemand}
                        {dashboard.marketChange ? ` (${dashboard.marketChange})` : ''}
                      </span>
                    )}
                    {dashboard.avgPrice && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-muted">
                        Avg. price: {dashboard.avgPrice}
                      </span>
                    )}
                  </div>
                )}
              </Panel>
            )}

            <Panel title="Your fields" icon={Tractor}>
              {fields.length > 0 ? (
                <ul className="space-y-3">
                  {fields.map((field) => (
                    <li
                      key={field.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-white">{field.name}</p>
                        <p className="mt-0.5 text-sm text-muted">
                          {field.crop_type ?? 'Crop not set'}
                          {field.area_acres != null ? ` · ${field.area_acres} acres` : ''}
                        </p>
                      </div>
                      {healthBadge(field.health_status)}
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyHint
                  message="No fields linked to your profile yet. Register your farm to track plots and crop health."
                  actionLabel="Complete registration"
                  actionTo="/farmer/register"
                />
              )}
            </Panel>

            {contractRows.length > 0 ? (
              <DataTable
                title="Buyer interest & contracts"
                columns={['Buyer', 'Crop', 'Status', 'Value']}
                rows={contractRows}
              />
            ) : (
              <Panel title="Buyer interest & contracts" icon={FileCheck}>
                <EmptyHint
                  message="No active buyer matches yet. A complete profile helps companies find you for contract farming."
                  actionLabel={profileComplete ? undefined : 'Improve your profile'}
                  actionTo={profileComplete ? undefined : '/farmer/register'}
                />
              </Panel>
            )}

            {farmerProfile && (
              <Panel title="Farm profile" icon={Droplets}>
                <dl className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Soil', farmerProfile.soil_type],
                    ['Irrigation', farmerProfile.irrigation],
                    ['Farming type', farmerProfile.farming_type],
                    ['Harvest', farmerProfile.harvest_timeline],
                    [
                      'Previous crops',
                      farmerProfile.previous_crops?.length
                        ? farmerProfile.previous_crops.join(', ')
                        : null,
                    ],
                    [
                      'Organic',
                      farmerProfile.organic != null
                        ? farmerProfile.organic
                          ? 'Yes'
                          : 'No'
                        : null,
                    ],
                  ]
                    .filter(([, v]) => v)
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5"
                      >
                        <dt className="text-xs text-muted">{label}</dt>
                        <dd className="mt-1 text-sm font-medium text-white">{value}</dd>
                      </div>
                    ))}
                </dl>
                <Link
                  to="/farmer/register"
                  className="mt-4 inline-flex text-sm font-semibold text-primary-light hover:text-white"
                >
                  Update profile
                </Link>
              </Panel>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="xl:col-span-1">
            <div className="sticky top-6">
              <AIAssistant profile={aiProfile} />
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="grid gap-6 lg:grid-cols-2">
          <Panel title="Weather" icon={CloudSun}>
            {dashboard?.weather ? (
              <>
                <p className="font-heading text-2xl font-bold text-white">
                  {dashboard.weather.temperature_c}°C · {dashboard.weather.condition}
                </p>
                {dashboard.weather.location && (
                  <p className="mt-1 text-sm text-muted">{dashboard.weather.location}</p>
                )}
                {dashboard.weather.rain_chance_percent != null && (
                  <p className="mt-2 text-sm text-primary-light">
                    Rain chance: {dashboard.weather.rain_chance_percent}%
                  </p>
                )}
                {dashboard.weather.insight && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {dashboard.weather.insight}
                  </p>
                )}
              </>
            ) : (
              <EmptyHint
                message={
                  locationLabel
                    ? 'Live weather loads when the API is running. You can still ask the AI assistant for irrigation advice.'
                    : 'Add your location in your profile to get regional weather insights.'
                }
                actionLabel={profileComplete ? undefined : 'Add location'}
                actionTo={profileComplete ? undefined : '/farmer/register'}
              />
            )}
          </Panel>

          <Panel title="Government schemes" icon={Landmark}>
            {schemeItems.length > 0 ? (
              <ul className="space-y-2">
                {schemeItems.map((scheme) => (
                  <li
                    key={scheme.key}
                    className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">{scheme.label}</p>
                    {scheme.detail && (
                      <p className="mt-1 text-xs text-muted">{scheme.detail}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyHint
                message="Scheme recommendations appear after you register with state, land size, and crops."
                actionLabel="Register for schemes"
                actionTo="/farmer/register"
              />
            )}
          </Panel>
        </motion.div>
      </motion.div>
    </div>
  );
}
