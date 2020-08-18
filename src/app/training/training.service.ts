import { Exercise } from './exercise.model';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 }
    ];
    private runningExercise: Exercise;
    getAvailableExercices() {
        return this.availableExercises.slice();
    }
    startExercise(selectId: string) {
        this.runningExercise = this.availableExercises.find(a => a.id === selectId);
    }
}
