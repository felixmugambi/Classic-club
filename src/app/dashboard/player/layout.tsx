import PlayerDashboardLayout from '../../../components/Dashboard/player/PlayerDashboardLayout';
import RequireGroup from '../../../components/auth/RequireGroup';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireGroup requiredGroups={['Players_manager']}>
      <PlayerDashboardLayout>{children}</PlayerDashboardLayout>
    </RequireGroup>
  );
}
