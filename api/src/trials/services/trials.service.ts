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
    const weightInPounds = participant.weight;
    const heightInFeet = participant.height;
    const heightInInches = heightInFeet * 12;
    const bmi = (weightInPounds / (heightInInches * heightInInches)) * 703;
    if (participant.diabetes && !participant.covid19 && bmi > 18 && bmi < 30) {
      return this.prisma.participant.create({
        data: {
          ...participant,
          trial: {
            connect: { id: trialId },
          },
        },
      });
    } else {
      throw new Error(`Participant is not eligible`);
    }
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
