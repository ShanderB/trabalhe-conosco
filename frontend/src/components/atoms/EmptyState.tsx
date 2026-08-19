import styled from 'styled-components';

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;
