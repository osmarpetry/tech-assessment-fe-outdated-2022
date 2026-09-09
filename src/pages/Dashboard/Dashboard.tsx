import React from 'react';
import { Link, NavLink as RouteNavLink } from 'react-router-dom';
import styled from 'styled-components';
import LogoSvg from './logo.svg'; // Import the SVG logo file

// Define our breakpoints for responsiveness
const breakpoints = {
  mobile: '768px',
  tablet: '1200px',
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #f5f5f5;
  padding: 34px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

const Logo = styled.img`
  height: 40px; // Set the height of your logo
`;

const NavLinkContainer = styled.nav``;

const NavLink = styled(RouteNavLink)`
  text-decoration: none;
  margin-left: 20px;
  color: #333;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: rgba(50, 95, 100, 1);
  }

  &:not(.active) {
    color: rgba(12, 12, 13, 0.48);
  }
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 15px 450px;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 15px 50px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
  }
`;

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <DashboardContainer>
      <Header>
        <Link to="/">
          <Logo src={LogoSvg} alt="Curebase Logo" />
        </Link>
        <NavLinkContainer>
          <NavLink to="/">Participants</NavLink>
          <NavLink to="/trials">Trials</NavLink>
        </NavLinkContainer>
      </Header>
      <Content>{children}</Content>
    </DashboardContainer>
  );
};

export default Dashboard;
