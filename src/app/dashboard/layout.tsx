'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import GroupSidebar from '../../components/Dashboard/GroupSidebar';
import { useAuth } from '../../components/context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [authorized, setAuthorized] = useState<boolean | null>(null); 
 

  const subDashboardPaths = ['/dashboard/player', '/dashboard/blog', '/dashboard/fixture'];
  const isSubDashboard = subDashboardPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please log in to access the dashboard.');
        setAuthorized(false);
        router.push('/auth/login');
      } else if (
        !user.groups.includes('Admin') &&
        !user.groups.includes('Players_Manager') &&
        !user.groups.includes('Blog_Editors') &&
        !user.groups.includes('Fixtures_Manager')
      ) {
        toast.error('You are not authorized to access the dashboard.');
        setAuthorized(false);
        router.push('/unauthorized');
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, router]);

  // Loading screen (while auth state is being checked)
  if (loading || authorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // If not authorized, don’t render children
  if (!authorized) return null;

  // ✅ Render dashboard only if authorized
  return (
    <div className="flex min-h-screen relative">
    {!isSubDashboard && <GroupSidebar />}
    <main className="flex-1 p-4">{children}</main>
  </div>
  );
}
