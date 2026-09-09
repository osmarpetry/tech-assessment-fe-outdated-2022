import InputMask from 'react-input-mask';
import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const InputMaskStyled = styled(InputMask)`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ErrorMessage = styled.span`
  font-size: 16px;
  color: red;
  margin-top: 8px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  margin-left: 8px;
`;

export const Select = styled.select`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: rgba(50, 95, 100, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
`;

export const Header = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
  text-align: left;
  margin: 20px 0 20px 0;
`;
