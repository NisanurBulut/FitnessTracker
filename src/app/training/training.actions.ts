import { Action } from '@ngrx/store';
import { STOP_LOADING } from '../shared/ui.actions';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Training] set available trainings';
export const SET_FINISHED_TRAININGS = '[Training] set finished trainings';
export const START_EXERCISE = '[Training] start exercice';
export const STOP_EXERCISE = '[Training] stop exercice';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;
    constructor(public payload: Exercise[]) { }
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload: Exercise[]) { }
}
export class StartExercise implements Action {
    readonly type = START_EXERCISE;
    constructor(public payload: string) { }
}

export class StopExercise implements Action {
    readonly type = STOP_EXERCISE;
    constructor(public payload: Exercise) { }
}
export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartExercise | StopExercise;
