import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styled from 'styled-components';
import { CHART_CATEGORICAL_PALETTE, CHART_INK, CHART_OTHER_COLOR } from '../../theme/chartPalette';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing(3)};
  height: 100%;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ChartArea = styled.div`
  width: 100%;
  height: 280px;
`;

const Empty = styled.div`
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;

export interface PieDatum {
  name: string;
  value: number;
}

interface PieChartCardProps {
  title: string;
  data: PieDatum[];
  maxSlices?: number;
  valueFormatter?: (value: number) => string;
}

const OTHER_LABEL = 'Outros';

function foldTail(data: PieDatum[], maxSlices: number): PieDatum[] {
  const sorted = [...data].filter((item) => item.value > 0).sort((a, b) => b.value - a.value);
  if (sorted.length <= maxSlices) return sorted;

  const head = sorted.slice(0, maxSlices - 1);
  const tail = sorted.slice(maxSlices - 1);
  const otherTotal = tail.reduce((sum, item) => sum + item.value, 0);
  return [...head, { name: OTHER_LABEL, value: otherTotal }];
}

export function PieChartCard({ title, data, maxSlices = 6, valueFormatter }: PieChartCardProps) {
  const slices = foldTail(data, maxSlices);
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  const format = valueFormatter ?? ((value: number) => String(value));

  return (
    <Card>
      <Title>{title}</Title>
      {total === 0 ? (
        <Empty>Sem dados para exibir</Empty>
      ) : (
        <ChartArea>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={92}
                paddingAngle={1}
                stroke="#ffffff"
                strokeWidth={2}
                labelLine={false}
                label={({ percent }) => (percent && percent >= 0.08 ? `${Math.round(percent * 100)}%` : '')}
              >
                {slices.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === OTHER_LABEL
                        ? CHART_OTHER_COLOR
                        : CHART_CATEGORICAL_PALETTE[index % CHART_CATEGORICAL_PALETTE.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [format(value), name]} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12, color: CHART_INK.secondary }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartArea>
      )}
    </Card>
  );
}
