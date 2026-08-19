import type { ReactNode } from 'react';
import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.primaryDark};
  padding-inline: ${({ theme }) => theme.spacing(3)};
`;

const Brand = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const NavItem = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radius};
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
  }

  &.active {
    color: #ffffff;
    background: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

const StyledContent = styled(Content)`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
        <Brand>Trabalhe Conosco — Produtores Rurais</Brand>
        <Nav>
          <NavItem to="/producers">
            <TeamOutlined /> Produtores
          </NavItem>
          <NavItem to="/dashboard">
            <DashboardOutlined /> Dashboard
          </NavItem>
        </Nav>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>
        Teste técnico fullstack — React + TypeScript + Redux Toolkit + NestJS
      </StyledFooter>
    </Layout>
  );
}
