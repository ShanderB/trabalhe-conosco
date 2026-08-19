import { PageSubtitle, PageTitle } from '../components/atoms/PageTitle';
import { DashboardView } from '../components/organisms/DashboardView';

export function DashboardPage() {
  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
      <PageSubtitle>Visão consolidada das fazendas cadastradas: total de área, distribuição por estado, por cultura e uso do solo.</PageSubtitle>
      <DashboardView />
    </div>
  );
}
