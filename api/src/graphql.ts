
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ParticipantInput {
    id: string;
    name: string;
    height: number;
    weight: number;
    diabetes: boolean;
    covid19: boolean;
}

export interface IQuery {
    participants(): Participant[] | Promise<Participant[]>;
    trials(): Trial[] | Promise<Trial[]>;
    trial(id: string): Trial | Promise<Trial>;
}

export interface Participant {
    id: string;
    name: string;
    height: number;
    weight: number;
    diabetes: boolean;
    covid19: boolean;
}

export interface Trial {
    id: string;
    description: string;
    participants: Participant[];
}

export interface IMutation {
    addParticipantToTrial(trialId: string, participant: ParticipantInput): Trial | Promise<Trial>;
}

type Nullable<T> = T | null;
