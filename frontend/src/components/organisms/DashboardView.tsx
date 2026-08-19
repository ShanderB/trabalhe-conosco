import { AreaChartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Alert, Skeleton } from 'antd';
import styled from 'styled-components';
import { StatTile } from '../molecules/StatTile';
import { PieChartCard } from '../molecules/PieChartCard';
import { useGetDashboardSummaryQuery } from '../../features/dashboard/dashboardApi';

const StatsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const hectareFormatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

export function DashboardView() {
  const { data, isLoading, isError } = useGetDashboardSummaryQuery();

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />;
  }

  if (isError || !data) {
    return <Alert type="error" showIcon message="Não foi possível carregar o resumo do dashboard." />;
  }

  const byStateData = data.byState.map((item) => ({ name: item.state, value: item.count }));
  const byCropData = data.byCrop.map((item) => ({ name: item.crop, value: item.count }));
  const landUseData = [
    { name: 'Agricultável', value: data.landUse.agricultable },
    { name: 'Vegetação', value: data.landUse.vegetation },
  ];

  return (
    <div>
      <StatsRow>
        <StatTile label="Total de fazendas" value={String(data.totalFarms)} icon={<EnvironmentOutlined />} />
        <StatTile
          label="Total de hectares"
          value={`${hectareFormatter.format(data.totalHectares)} ha`}
          icon={<AreaChartOutlined />}
        />
      </StatsRow>
      <ChartsGrid>
        <PieChartCard title="Fazendas por estado" data={byStateData} />
        <PieChartCard title="Área plantada por cultura" data={byCropData} />
        <PieChartCard
          title="Uso do solo (agricultável x vegetação)"
          data={landUseData}
          valueFormatter={(value) => `${hectareFormatter.format(value)} ha`}
        />
      </ChartsGrid>
    </div>
  );
}
