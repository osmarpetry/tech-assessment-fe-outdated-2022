import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Eligible from './eligible.svg';
import NotEligible from './not-eligible.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(50vh);
`;

const Image = styled.img`
  width: 96px;
  height: 96px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin: 4px 0 0 0;
  text-align: left;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: rgba(50, 95, 100, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

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
