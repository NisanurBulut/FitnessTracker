import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    private runningExercise: Exercise;

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
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    startExercise(selectId: string) {
        this.runningExercise = this.availableExercises.find(
            a => a.id === selectId
        );
        this.exerciseChange.next({ ...this.runningExercise });
    }
}
