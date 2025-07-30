'use client';

import ProtectedRoute from '../../../components/protect/ProtectedRoute';
import BlogDashboardPage from '../../../components/Dashboard/blog/BlogDashBoardPage';

export default function ProtectedBlogDashboardPage() {
  return (
    <ProtectedRoute allowedGroups={['Blog_Editors']}>
      <BlogDashboardPage />
    </ProtectedRoute>
  );
}
