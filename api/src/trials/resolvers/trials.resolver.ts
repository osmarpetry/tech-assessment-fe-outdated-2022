import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TrialsService } from '../services/trials.service';
import { Participant, Trial } from '@prisma/client';
import { ParticipantInput } from 'src/graphql';

@Resolver('Trial')
export class TrialsResolver {
  constructor(private readonly trialsService: TrialsService) {}

  @Query('trials')
  async getTrials(): Promise<Trial[]> {
    return this.trialsService.trials();
  }

  @Query('trial')
  async getTrial(@Args('id') id: number): Promise<Trial | null> {
    return this.trialsService.trial(id);
  }

  @Mutation('addParticipantToTrial')
  async addParticipant(
    @Args('trialId') trialId: number,
    @Args('participant')
    participant: ParticipantInput,
  ): Promise<Trial> {
    return this.trialsService.addParticipantToTrial(trialId, participant);
  }
}
