
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    participants(): Participant[] | Promise<Participant[]>;
    trials(): Trial[] | Promise<Trial[]>;
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

type Nullable<T> = T | null;
