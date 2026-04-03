'use client';

import ProtectedRoute from '../../../components/protect/ProtectedRoute';
import FixtureDashboardPage from '../../../components/Dashboard/fixtures/FixtureDashboardPage';

export default function ProtectedBlogDashboardPage() {
  return (
    <ProtectedRoute allowedGroups={['Blog_Editors']}>
      <FixtureDashboardPage />
    </ProtectedRoute>
  );
}
