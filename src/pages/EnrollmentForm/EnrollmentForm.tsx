import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Input = styled.input`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputMaskStyled = styled(InputMask)`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  font-size: 16px;
  color: red;
  margin-top: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  margin-left: 8px;
`;

const Select = styled.select`
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  height: 40px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

type FormData = {
  name: string;
  height: string;
  weight: string;
  diabetes: boolean;
  covid19: boolean;
  trial: string;
};

const ADD_PARTICIPANT_TO_TRIAL = gql`
  mutation AddParticipantToTrial(
    $trialId: String!
    $participant: ParticipantInput!
  ) {
    addParticipantToTrial(trialId: $trialId, participant: $participant) {
      id
    }
  }
`;

const EnrollmentForm = () => {
  const [addParticipantToTrial, { data, loading, error }] = useMutation(
    ADD_PARTICIPANT_TO_TRIAL
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission here
    console.log(data);
    addParticipantToTrial({
      variables: {
        trialId: '1',
        participant: {
          id: '66',
          name: data.name,
          height: parseFloat(data.height),
          weight: parseFloat(data.weight),
          diabetes: data.diabetes,
          covid19: data.covid19,
        },
      },
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor="height">Height (inches)</Label>
        <InputMaskStyled
          mask="99.99 ft"
          type="text"
          id="height"
          {...register('height', { required: true })}
        />
        {errors.height && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor="weight">Weight (pounds)</Label>
        <InputMaskStyled
          mask="99.99 lbs"
          type="text"
          id="weight"
          {...register('weight', { required: true })}
        />
        {errors.weight && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldWrapper>

      <CheckboxWrapper>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="diabetes"
            {...register('diabetes', { required: true })}
          />
          <CheckboxLabel htmlFor="diabetes">I have diabetes</CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="covid19"
            {...register('covid19', { required: true })}
          />
          <CheckboxLabel htmlFor="covid19">I have COVID-19</CheckboxLabel>
        </CheckboxContainer>
      </CheckboxWrapper>
      <FieldWrapper>
        <Label htmlFor="trial">Select Trial</Label>
        <Select id="trial" {...register('trial', { required: true })}>
          <option value="">Select a trial</option>
          <option value="trial1">Trial 1</option>
          <option value="trial2">Trial 2</option>
          <option value="trial3">Trial 3</option>
        </Select>
        {errors.trial && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldWrapper>
      <Button type="submit">Save</Button>
    </FormContainer>
  );
};

export default EnrollmentForm;
