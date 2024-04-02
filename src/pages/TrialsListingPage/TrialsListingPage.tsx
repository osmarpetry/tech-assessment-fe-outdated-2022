import { useQuery, gql } from '@apollo/client';
import RightIcon from './right.svg';
import {
  PageContainer,
  Header,
  TrialCard,
  TrialLink,
  TrialLinkText,
  TrialName,
  ParticipantCount,
  Logo,
} from './styled';

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
