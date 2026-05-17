import {
  LayoutDashboard,
  Sprout,
  TrendingUp,
  FileText,
  Mic,
  Users,
  Package,
  BarChart3,
  MapPin,
  Landmark,
} from 'lucide-react';

export const farmerLinks = [
  { label: 'Overview', path: '/farmer', icon: LayoutDashboard },
  { label: 'Crops', path: '/farmer', icon: Sprout },
  { label: 'Market', path: '/farmer', icon: TrendingUp },
  { label: 'Contracts', path: '/farmer', icon: FileText },
];

export const companyLinks = [
  { label: 'Overview', path: '/company', icon: LayoutDashboard },
  { label: 'Procurement', path: '/company', icon: Package },
  { label: 'Farmers', path: '/company', icon: Users },
  { label: 'Contracts', path: '/company', icon: FileText },
];

export const fpoLinks = [
  { label: 'Overview', path: '/fpo', icon: LayoutDashboard },
  { label: 'Members', path: '/fpo', icon: Users },
  { label: 'Analytics', path: '/fpo', icon: BarChart3 },
  { label: 'Schemes', path: '/fpo', icon: Landmark },
];
