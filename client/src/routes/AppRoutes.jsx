import { Navigate, Outlet, Routes, Route, useLocation } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import FarmerDashboard from '../pages/farmer/FarmerDashboard';
import FarmerRegister from '../pages/farmer/FarmerRegister';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import CompanyRequirement from '../pages/company/CompanyRequirement';
import CompanyMatches from '../pages/company/CompanyMatches';
import FPODashboard from '../pages/fpo/FPODashboard';
import { farmerLinks, companyLinks, fpoLinks } from '../constants/dashboard';
import { getUser } from '../services/api';

function ProtectedRoute({ roles }) {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    const fallback = user.role === 'company' ? '/company' : user.role === 'fpo' ? '/fpo' : '/farmer';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute roles={['farmer', 'admin']} />}>
        <Route
          path="/farmer"
          element={<DashboardLayout links={farmerLinks} title="Farmer Portal" />}
        >
          <Route index element={<FarmerDashboard />} />
          <Route path="register" element={<FarmerRegister />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute roles={['company', 'admin']} />}>
        <Route
          path="/company"
          element={<DashboardLayout links={companyLinks} title="Company Portal" />}
        >
          <Route index element={<CompanyDashboard />} />
          <Route path="requirement" element={<CompanyRequirement />} />
          <Route path="matches/:requirementId" element={<CompanyMatches />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute roles={['fpo', 'admin']} />}>
        <Route
          path="/fpo"
          element={<DashboardLayout links={fpoLinks} title="FPO Portal" />}
        >
          <Route index element={<FPODashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
