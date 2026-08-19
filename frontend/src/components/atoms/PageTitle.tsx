import styled from 'styled-components';

export const PageTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const PageSubtitle = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing(3)} 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;
