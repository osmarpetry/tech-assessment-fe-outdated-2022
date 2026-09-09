import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import RightIcon from '../TrialsListingPage/right.svg';
import { useQuery, gql } from '@apollo/client';
import {
  PageContainer,
  HeaderContainer,
  Header,
  Button,
  ParticipantCard,
  ParticipantLink,
  ParticipantLinkText,
  ParticipantName,
  ParticipantCount,
  Logo,
} from './styled';

type Participant = {
  id: string;
  name: string;
  createdAt: string;
};

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
  const trialId = parseFloat(id || '');

  const { loading, error, data } = useQuery<{ trial: { participants: Participant[] } }>(GET_PARTICIPANTS, {
    variables: { trialId },
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
