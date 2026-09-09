import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, gql, useQuery } from '@apollo/client';
import {
  FormContainer,
  Header,
  FieldWrapper,
  Label,
  Input,
  ErrorMessage,
  InputMaskStyled,
  CheckboxWrapper,
  CheckboxContainer,
  CheckboxLabel,
  Select,
  Button,
} from './styled';

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

type Trial = {
  id: string;
  name: string;
};

const GET_TRIALS = gql`
  query GetTrials {
    trials {
      id
      name
    }
  }
`;

type FormData = {
  name: string;
  height: string;
  weight: string;
  diabetes: boolean;
  covid19: boolean;
  trial: string;
};

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const trialId = parseFloat(id || '');

  const [addParticipantToTrial, { loading: loadingAdd }] = useMutation(
    ADD_PARTICIPANT_TO_TRIAL
  );
  const { data: trialsData, loading } = useQuery<{ trials: Trial[] }>(GET_TRIALS);

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
      <Header>Enroll a participant</Header>
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
