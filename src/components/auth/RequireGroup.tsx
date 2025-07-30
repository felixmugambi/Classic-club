'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RequireGroup({
  children,
  requiredGroups,
}: {
  children: React.ReactNode;
  requiredGroups: string[];
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!user) return;

    const hasAccess = requiredGroups.some(group => user.groups.includes(group));
    if (!hasAccess) {
      router.replace('/unauthorized'); // 👈 You’ll create this page next
    } else {
      setAllowed(true);
    }
  }, [user]);

  if (!allowed) return null;

  return <>{children}</>;
}
