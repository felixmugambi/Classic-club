'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import GroupSidebar from '../../components/Dashboard/GroupSidebar';
import { useAuth } from '../../components/context/AuthContext';
import toast from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [authorized, setAuthorized] = useState(false); // 👈 controls render

  const subDashboardPaths = ['/dashboard/player', '/dashboard/blog', '/dashboard/fixture'];
  const isSubDashboard = subDashboardPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Please log in to access the dashboard.');
        router.push('/auth/login');
      } else if (
        !user.groups.includes('Admin') &&
        !user.groups.includes('Players_Manager') &&
        !user.groups.includes('Blog_Editors') &&
        !user.groups.includes('Fixtures_Manager')
      ) {
        toast.error('You are not authorized to access the dashboard.');
        router.push('/unauthorized');
      } else {
        setAuthorized(true); // ✅ allow rendering only if authorized
      }
    }
  }, [user, loading, router]);

  if (loading || !authorized) return null; // 🔒 Avoid render until ready

  return (
    <div className="flex min-h-screen">
      {!isSubDashboard && <GroupSidebar />}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
