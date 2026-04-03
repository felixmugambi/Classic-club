'use client';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({
  children,
  allowedGroups,
}: {
  children: React.ReactNode;
  allowedGroups: string[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login'); // not logged in
      } else if (!user.groups.some((g) => allowedGroups.includes(g))) {
        router.push('/unauthorized'); // access denied
      }
    }
  }, [user, loading]);

  if (loading || !user) return <p className="p-4">Checking access...</p>;

  return <>{children}</>;
}
