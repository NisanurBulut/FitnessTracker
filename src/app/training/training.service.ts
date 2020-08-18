import { Exercise } from './exercise.model';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 }
    ];

    getAvailableExercices() {
        return this.availableExercises.slice();
    }
}
