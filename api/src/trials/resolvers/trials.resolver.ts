import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TrialsService } from '../services/trials.service';
import { Trial, Participant } from 'src/graphql';

@Resolver()
export class TrialsResolver {
  constructor(private trialsService: TrialsService) {}

  @Query('trials')
  async trials(): Promise<Trial[]> {
    return await this.trialsService.getTrials();
  }

  @Query('trial')
  async trial(@Args('id') id: string): Promise<Trial> {
    return await this.trialsService.getTrialsById(id);
  }

  @Mutation('addParticipantToTrial')
  async addParticipantToTrial(
    @Args('trialId') trialId: string,
    @Args('participant') participant: Participant,
  ): Promise<Trial> {
    return await this.trialsService.addParticipantToTrial(trialId, participant);
  }
}
