import { Frequency } from "../enums/frequency.enum";

export interface IExercise {
    _id: string;
    _rev: string;
    name: string;
    minReps: number;
    maxReps: number;
    sets: number;
    minWeight: number;
    minIncrement: number;
    frequency: Frequency;
    addBodyWeight: boolean;
}