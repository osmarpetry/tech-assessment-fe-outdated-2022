import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(50vh);
`;

export const Image = styled.img`
  width: 96px;
  height: 96px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  margin: 4px 0 0 0;
  text-align: left;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: rgba(50, 95, 100, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
