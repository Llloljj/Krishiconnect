export const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Features', href: '#features' },
  { label: 'AI Matching', href: '#ai-matching' },
  { label: 'Dashboards', href: '#dashboards' },
  { label: 'How It Works', href: '#how-it-works' },
];

export const trustIndicators = [
  'ISO-grade security',
  'Govt. scheme integrated',
  '12+ regional languages',
];

export const problems = [
  {
    stat: '40%',
    label: 'lost to middlemen',
    description: 'Farmers lose margin to intermediaries with no price transparency.',
  },
  {
    stat: '62%',
    label: 'demand uncertainty',
    description: 'No visibility into buyer demand before planting decisions.',
  },
  {
    stat: '3×',
    label: 'supply chain gaps',
    description: 'Disconnected farmers, FPOs, and companies across regions.',
  },
];

export const problemBullets = [
  'Middlemen capture margins without adding value',
  'Demand signals arrive too late for planting decisions',
  'Farmers lack fair contracts and payment transparency',
  'Companies struggle to source verified, quality produce',
  'FPOs cannot aggregate demand at scale efficiently',
];

export const aiSolutions = [
  {
    title: 'AI Matching Engine',
    description: 'Soil, climate, logistics, and capacity scored in real time.',
    metric: '87% avg. match',
  },
  {
    title: 'Demand Intelligence',
    description: 'Live procurement signals and market pricing by region.',
    metric: '24 regions',
  },
  {
    title: 'Smart Contracts',
    description: 'Digital agreements with milestone tracking and payouts.',
    metric: '100% traceable',
  },
  {
    title: 'FPO Aggregation',
    description: 'Bulk procurement and collective bargaining power.',
    metric: '1,200+ FPOs',
  },
  {
    title: 'Voice Assistance',
    description: 'Hindi-first AI for schemes, alerts, and contract Q&A.',
    metric: '12 languages',
  },
];

export const coreFeatures = [
  {
    tier: 1,
    title: 'Farmer Registration',
    description:
      'Rich profiles: land size, soil, irrigation, crops, location, transport, organic status, harvest timeline.',
  },
  {
    tier: 1,
    title: 'Company Requirements',
    description:
      'Post crop, quantity, region, pricing, duration, and climate preferences for sourcing.',
  },
  {
    tier: 1,
    title: 'AI Matching Engine',
    description:
      'Soil, climate, logistics, production capability, and proximity — scored instantly.',
    highlight: true,
  },
  {
    tier: 1,
    title: 'Demand Visibility',
    description: 'High-demand crops, live market pricing, and active buyers in one view.',
  },
  {
    tier: 1,
    title: 'FPO Integration',
    description: 'Aggregation, bulk contracts, and regional procurement at scale.',
  },
  {
    tier: 2,
    title: 'AI Voice Assistant',
    description: 'Hindi voice support, reminders, alerts, and contextual Q&A.',
  },
  {
    tier: 2,
    title: 'Government Schemes',
    description: 'AI eligibility recommendations and guided applications.',
  },
  {
    tier: 2,
    title: 'Crop Recommendations',
    description: 'Soil, climate, and demand-driven planting intelligence.',
  },
];

export const matchFactors = [
  { label: 'Soil compatibility', score: 92, color: '#81C784' },
  { label: 'Climate alignment', score: 88, color: '#2E7D32' },
  { label: 'Logistics fit', score: 85, color: '#B7E4C7' },
  { label: 'Production capacity', score: 90, color: '#66BB6A' },
  { label: 'Location proximity', score: 78, color: '#4CAF50' },
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Farmer Registers',
    description: 'Onboard with land, crops, and location in under five minutes.',
  },
  {
    step: '02',
    title: 'AI Finds Best Matches',
    description: 'Our engine surfaces buyers, contracts, and schemes tailored to you.',
  },
  {
    step: '03',
    title: 'Secure Smart Contracts',
    description: 'Sign digitally, track delivery, and receive transparent payouts.',
  },
];

export const roles = [
  {
    id: 'farmer',
    title: 'Farmers',
    path: '/signup?role=farmer',
    dashboardPath: '/farmer',
    description: 'Contracts, demand insights, voice help, and government schemes.',
    cta: 'Join as Farmer',
  },
  {
    id: 'company',
    title: 'Companies',
    path: '/signup?role=company',
    dashboardPath: '/company',
    description: 'Source quality produce, predict demand, and manage procurement.',
    cta: 'Join as Company',
  },
  {
    id: 'fpo',
    title: 'FPOs',
    path: '/signup?role=fpo',
    dashboardPath: '/fpo',
    description: 'Empower members with bulk contracts, analytics, and scheme tracking.',
    cta: 'Join as FPO',
  },
];

export const testimonials = [
  {
    name: 'Ramesh Patil',
    role: 'Farmer, Nashik',
    quote:
      'KrishiConnect matched me with a buyer before harvest. My income went up 30% this season.',
    initials: 'RP',
  },
  {
    name: 'Priya Sharma',
    role: 'Procurement Head, AgriCorp',
    quote:
      'We source from 200+ verified farmers now. AI matching cut our sourcing time in half.',
    initials: 'PS',
  },
  {
    name: 'Vikram Singh',
    role: 'FPO Director, Punjab',
    quote:
      'Our members access schemes and contracts in one app — even in Punjabi via voice.',
    initials: 'VS',
  },
];

export const governmentImpacts = [
  {
    title: 'Rural Empowerment',
    description: 'Digital access and fair trade strengthen village economies nationwide.',
    stat: '50K+',
  },
  {
    title: 'Farmer Income',
    description: 'Better prices, predictable buyers, and scheme discovery in one place.',
    stat: '+30%',
  },
  {
    title: 'Digital Agriculture',
    description: 'Nation-scale data infrastructure for modern, resilient farming.',
    stat: '24 states',
  },
  {
    title: 'Transparency',
    description: 'Visible contracts and payments reduce middlemen and disputes.',
    stat: '100%',
  },
];

export const authRoles = [
  { id: 'farmer', label: 'Farmer', description: 'Sell produce, access schemes' },
  { id: 'company', label: 'Company', description: 'Source and procure crops' },
  { id: 'fpo', label: 'FPO', description: 'Aggregate and empower members' },
];
