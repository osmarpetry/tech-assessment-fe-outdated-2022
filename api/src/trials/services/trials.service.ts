import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import {
  Trial as TrialModel,
  Participant as ParticipantModel,
} from '@prisma/client';

@Injectable()
export class TrialsService {
  constructor(private prisma: PrismaService) {}

  async addParticipantToTrial(
    trialId: number,
    participant: {
      name: string;
      covid19: boolean;
      diabetes: boolean;
      height: number;
      weight: number;
    },
  ): Promise<ParticipantModel> {
    return this.prisma.participant.create({
      data: {
        ...participant,
        trial: {
          connect: { id: trialId },
        },
      },
    });
  }

  async trial(trialId: number): Promise<TrialModel | null> {
    return this.prisma.trial.findUnique({
      where: { id: trialId },
      include: { participants: true },
    });
  }

  async trials(): Promise<TrialModel[]> {
    return this.prisma.trial.findMany({
      include: { participants: true },
    });
  }
}
