import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import MobileNav from '../components/dashboard/MobileNav';

export default function DashboardLayout({ links, title }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden shrink-0 lg:block">
        <DashboardSidebar links={links} title={title} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav links={links} />
        <Outlet />
      </div>
    </div>
  );
}
