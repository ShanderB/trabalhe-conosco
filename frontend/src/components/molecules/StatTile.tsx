import type { ReactNode } from 'react';
import styled from 'styled-components';

const Tile = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 200px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Value = styled.strong`
  font-size: 32px;
  line-height: 1.1;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

interface StatTileProps {
  label: string;
  value: string;
  icon?: ReactNode;
}

export function StatTile({ label, value, icon }: StatTileProps) {
  return (
    <Tile>
      <Label>
        {icon}
        {label}
      </Label>
      <Value>{value}</Value>
    </Tile>
  );
}
