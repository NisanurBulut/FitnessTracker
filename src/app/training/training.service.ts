import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    private availableExercises: Exercise[] = [
        { id: 'crunches0', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches1', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches2', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches3', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'crunches4', name: 'Crunches', duration: 30, calories: 8 }
    ];
    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChange.next(null);

    }
    cancelExercise(progress: number) {
        this.exercises.push({ ...this.runningExercise, date: new Date(), duration: this.runningExercise.duration * (progress / 100), calories: this.runningExercise.duration * (progress / 100), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }
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
