import { Routes, Route } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import FarmerDashboard from '../pages/farmer/FarmerDashboard';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import FPODashboard from '../pages/fpo/FPODashboard';
import { farmerLinks, companyLinks, fpoLinks } from '../constants/dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route
        path="/farmer"
        element={<DashboardLayout links={farmerLinks} title="Farmer Portal" />}
      >
        <Route index element={<FarmerDashboard />} />
      </Route>
      <Route
        path="/company"
        element={<DashboardLayout links={companyLinks} title="Company Portal" />}
      >
        <Route index element={<CompanyDashboard />} />
      </Route>
      <Route
        path="/fpo"
        element={<DashboardLayout links={fpoLinks} title="FPO Portal" />}
      >
        <Route index element={<FPODashboard />} />
      </Route>
    </Routes>
  );
}
