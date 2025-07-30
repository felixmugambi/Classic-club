import BlogDashboardLayout from '../../../components/Dashboard/blog/BlogDashboardLayout';
import RequireGroup from '../../../components/auth/RequireGroup';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireGroup requiredGroups={['Blog_Editors']}>
      <BlogDashboardLayout>{children}</BlogDashboardLayout>
    </RequireGroup>
  );
}
