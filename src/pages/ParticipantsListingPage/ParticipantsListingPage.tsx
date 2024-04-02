import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'styled-components';
import RightIcon from '../TrialsListingPage/right.svg'; // Import the SVG logo file
import { useQuery, gql } from '@apollo/client';

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
  margin: ;
`;

const ParticipantCard = styled.div`
  padding: 20px 0 20px 0;
  border-radius: 5px;
  border-bottom: 1px solid rgba(12, 12, 13, 0.08);

  &:hover {
    background-color: rgba(12, 12, 13, 0.03);
    transition: background-color 0.3s ease-in-out;
  }
`;

const ParticipantLink = styled.span`
  cursor: not-allowed;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  padding-right: 15px;
`;

const ParticipantLinkText = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const ParticipantName = styled.span`
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled(Link)`
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

const GET_PARTICIPANTS = gql`
  query GetParticipants($trialId: Int!) {
    trial(id: $trialId) {
      id
      participants {
        id
        name
        createdAt
      }
    }
  }
`;

const ParticipantsListingPage = () => {
  const { id } = useParams();
  const trialId = parseFloat(id);

  const { loading, error, data } = useQuery(GET_PARTICIPANTS, {
    variables: { trialId }, // Replace '01' with the actual trial ID from the router
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <PageContainer>
      <HeaderContainer>
        <Header>Participants</Header>
        <Button to={`/trials/${id}/enroll-a-participant`}>
          Enroll a participant
        </Button>
      </HeaderContainer>
      {data?.trial.participants.map((participant) => (
        <ParticipantCard key={participant.id}>
          <ParticipantLink>
            <ParticipantLinkText>
              <ParticipantName>{participant.name}</ParticipantName>
              <ParticipantCount>
                Enrolled in{' '}
                {format(new Date(parseInt(participant.createdAt)), 'MMM, dd')}
              </ParticipantCount>
            </ParticipantLinkText>
            <Logo src={RightIcon} alt={`Go to ${participant.name}`} />
          </ParticipantLink>
        </ParticipantCard>
      ))}
    </PageContainer>
  );
};

export default ParticipantsListingPage;
