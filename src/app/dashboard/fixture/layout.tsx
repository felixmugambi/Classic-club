import FixtureDashboardLayout from '../../../components/Dashboard/fixtures/FixtureDashboardLayout';
import RequireGroup from '../../../components/auth/RequireGroup';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireGroup requiredGroups={['Fixtures_Manager']}>
      <FixtureDashboardLayout>{children}</FixtureDashboardLayout>
    </RequireGroup>
  );
}
