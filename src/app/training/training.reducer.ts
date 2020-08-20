import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_EXERCISE, STOP_EXERCISE } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from './../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}
export interface State extends fromRoot.State {
    training: TrainingState;
}
const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_EXERCISE:
            return {
                ...state,
                activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            };
        case STOP_EXERCISE:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }
}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
