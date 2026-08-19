import styled from 'styled-components';
import { documentType, formatDocument } from '../../utils/documentValidator';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-variant-numeric: tabular-nums;

  strong {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.primaryDark};
    background: ${({ theme }) => theme.colors.primaryLight};
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

interface DocumentBadgeProps {
  document: string;
}

export function DocumentBadge({ document }: DocumentBadgeProps) {
  const type = documentType(document);
  return (
    <Badge>
      {type && <strong>{type}</strong>}
      <span>{formatDocument(document)}</span>
    </Badge>
  );
}
