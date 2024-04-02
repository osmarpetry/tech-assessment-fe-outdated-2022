import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link as RouteNavLink } from 'react-router-dom';
import styled from 'styled-components';
import RightIcon from './right.svg'; //

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: 20px 0 0 0;
`;

const TrialCard = styled.div`
  padding: 20px 0 20px 0;
  border-radius: 5px;
  border-bottom: 1px solid rgba(12, 12, 13, 0.08);

  &:hover {
    background-color: rgba(12, 12, 13, 0.03);
    transition: background-color 0.3s ease-in-out;
  }
`;

const TrialLink = styled(RouteNavLink)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-right: 15px;
`;

const TrialLinkText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const TrialName = styled.span`
  color: rgba(12, 12, 13, 0.88);
  line-height: 35px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
`;

const ParticipantCount = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  color: rgba(12, 12, 13, 0.48);
`;

const Logo = styled.img`
  height: 14px; // Set the height of your logo
`;

const GET_TRIALS = gql`
  query GetTrials {
    trials {
      id
      name
      participants {
        id
      }
    }
  }
`;

const TrialsListingPage = () => {
  const { loading, error, data } = useQuery(GET_TRIALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PageContainer>
      <Header>Trials</Header>
      {data?.trials.map((trial) => (
        <TrialCard key={trial.id}>
          <TrialLink to={`/trials/${trial.id}`}>
            <TrialLinkText>
              <TrialName>{trial.name}</TrialName>
              <ParticipantCount>
                {trial.participants.length} participants
              </ParticipantCount>
            </TrialLinkText>
            <Logo src={RightIcon} alt={`Go to ${trial.id}`} />
          </TrialLink>
        </TrialCard>
      ))}
    </PageContainer>
  );
};

export default TrialsListingPage;
