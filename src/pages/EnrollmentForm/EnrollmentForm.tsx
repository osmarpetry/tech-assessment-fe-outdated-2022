import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, gql, useQuery } from '@apollo/client';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
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
  padding: 10px 20px;
  margin-top: 20px;
  background-color: rgba(50, 95, 100, 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
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
    $trialId: Int!
    $participant: ParticipantInput!
  ) {
    addParticipantToTrial(trialId: $trialId, participant: $participant) {
      name
      height
      weight
      diabetes
      covid19
    }
  }
`;

const GET_TRIALS = gql`
  query GetTrials {
    trials {
      id
      name
    }
  }
`;

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const trialId = parseFloat(id || '');

  const [addParticipantToTrial, { loading: loadingAdd }] = useMutation(
    ADD_PARTICIPANT_TO_TRIAL
  );
  const { data: trialsData, loading } = useQuery(GET_TRIALS);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await addParticipantToTrial({
      variables: {
        trialId: 1,
        participant: {
          name: data.name,
          height: parseFloat(data.height),
          weight: parseFloat(data.weight),
          diabetes: data.diabetes,
          covid19: data.covid19,
        },
      },
    })
      .then(() => {
        navigate(`/trials/${trialId}/enroll-a-participant-result`, {
          state: { isEligible: true },
        });
      })
      .catch(() => {
        navigate(`/trials/${trialId}/enroll-a-participant-result`, {
          state: { isEligible: false },
        });
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
        {errors.name && <ErrorMessage>This is a required field</ErrorMessage>}
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor="height">Height (inches)</Label>
        <InputMaskStyled
          mask="9.99 ft"
          type="text"
          id="height"
          {...register('height', { required: true })}
        />
        {errors.height && <ErrorMessage>This is a required field</ErrorMessage>}
      </FieldWrapper>
      <FieldWrapper>
        <Label htmlFor="weight">Weight (pounds)</Label>
        <InputMaskStyled
          mask="999.99 lbs"
          type="text"
          id="weight"
          {...register('weight', { required: true })}
        />
        {errors.weight && <ErrorMessage>This is a required field</ErrorMessage>}
      </FieldWrapper>
      <CheckboxWrapper>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="diabetes"
            {...register('diabetes', { required: false })}
          />
          <CheckboxLabel htmlFor="diabetes">I have diabetes</CheckboxLabel>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            id="covid19"
            {...register('covid19', { required: false })}
          />
          <CheckboxLabel htmlFor="covid19">I have COVID-19</CheckboxLabel>
        </CheckboxContainer>
      </CheckboxWrapper>
      <FieldWrapper>
        <Label htmlFor="trial">Select Trial</Label>
        <Select
          id="trial"
          disabled={loading}
          {...register('trial', { required: true })}
        >
          <option value="">Select a trial</option>
          {trialsData?.trials.map((trial) => (
            <option key={trial.id} value={trial.id}>
              {trial.name}
            </option>
          ))}
        </Select>
        {errors.trial && <ErrorMessage>This is a required field</ErrorMessage>}
      </FieldWrapper>
      <Button type="submit" disabled={loadingAdd}>
        {!loadingAdd ? 'Save' : 'Saving...'}
      </Button>
    </FormContainer>
  );
};

export default EnrollmentForm;
