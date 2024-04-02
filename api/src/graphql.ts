
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ParticipantInput {
    covid19: boolean;
    diabetes: boolean;
    height: number;
    name: string;
    weight: number;
}

export interface Trial {
    id: number;
    name: string;
    participants: Participant[];
}

export interface Participant {
    id: number;
    name: string;
    height: number;
    weight: number;
    diabetes: boolean;
    covid19: boolean;
    createdAt: string;
}

export interface IQuery {
    trials(): Trial[] | Promise<Trial[]>;
    trial(id: number): Nullable<Trial> | Promise<Nullable<Trial>>;
}

export interface IMutation {
    addParticipantToTrial(trialId: number, participant: ParticipantInput): Participant | Promise<Participant>;
}

type Nullable<T> = T | null;
