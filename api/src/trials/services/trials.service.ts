import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { Participant, Trial } from 'src/graphql';

@Injectable()
export class TrialsService {
  constructor(private prismaService: PrismaService) {}

  async getTrials(whereInput?: Prisma.TrialWhereInput) {
    return this.prismaService.trial.findMany({
      where: whereInput,
      include: { participants: true },
    });
  }

  async getTrialsById(id: string) {
    return this.prismaService.trial.findUnique({
      where: { id },
      include: { participants: true },
    });
  }
  async addParticipantToTrial(
    trialId: string,
    participant: Participant,
  ): Promise<Trial> {
    const { diabetes, covid19, weight, height } = participant;

    if (!diabetes) {
      throw new BadRequestException('Participant must have diabetes');
    }

    if (covid19) {
      throw new BadRequestException('Participant must not have had COVID');
    }

    const bmi = (weight / (height * height)) * 703;

    if (bmi <= 18 || bmi >= 30) {
      throw new BadRequestException(
        'Participant BMI must be between 18 and 30',
      );
    }

    return await this.prismaService.trial.update({
      where: { id: trialId },
      data: {
        participants: {
          create: participant,
        },
      },
      include: { participants: true },
    });
  }
}
