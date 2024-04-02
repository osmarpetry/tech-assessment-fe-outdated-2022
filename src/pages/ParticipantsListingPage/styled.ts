import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: ;
`;

export const ParticipantCard = styled.div`
  padding: 20px 0 20px 0;
  border-radius: 5px;
  border-bottom: 1px solid rgba(12, 12, 13, 0.08);

  &:hover {
    background-color: rgba(12, 12, 13, 0.03);
    transition: background-color 0.3s ease-in-out;
  }
`;

export const ParticipantLink = styled.span`
  cursor: not-allowed;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-right: 15px;
`;

export const ParticipantLinkText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: start;
  display: flex;
  flex-direction: column;
`;

export const ParticipantName = styled.span`
  color: rgba(12, 12, 13, 0.88);
  line-height: 35px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
`;

export const ParticipantCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  color: rgba(12, 12, 13, 0.48);
`;

export const Logo = styled.img`
  height: 14px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled(Link)`
  padding: 10px 16px;
  max-height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  text-decoration: none;
  opacity: 0px;
  background: rgba(50, 95, 100, 1);
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  text-align: left;
  color: rgba(254, 254, 255, 1);
`;
