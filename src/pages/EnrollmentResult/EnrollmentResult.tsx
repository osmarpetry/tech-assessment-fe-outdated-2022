import { useLocation, useNavigate } from 'react-router-dom';
import Eligible from './eligible.svg';
import NotEligible from './not-eligible.svg';
import { Container, Title, Description, Button, Image } from './styled';

const EnrollmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isEligible } = location.state;

  const handleRedirectOk = () => {
    navigate(-2);
  };

  return (
    <Container>
      {isEligible ? (
        <>
          <Image src={Eligible} alt="Success" />
          <Title>Participant is eligible</Title>
          <Description>
            The participant can participate in this study.
          </Description>
        </>
      ) : (
        <>
          <Image src={NotEligible} alt="Fail" height={'30px'} />
          <Title>Participant is not eligible</Title>
          <Description>
            The participant can't participate in this study.
          </Description>
        </>
      )}
      <Button onClick={handleRedirectOk}>Ok</Button>
    </Container>
  );
};

export default EnrollmentResult;
