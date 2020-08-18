import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    exercisesChange=new Subject<Exercise[]>();
    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    private availableExercises: Exercise[] = [];
    constructor(private db: AngularFirestore) { }
    completeExercise() {
        console.log(this.runningExercise);
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }
    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }
    fetchAvailableExercices() {
        return this.db.collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });
            })).subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChange.next([...this.availableExercises]);
            });
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    getAllExercises() {
        return this.exercises.slice();
    }
    startExercise(selectId: string) {
        this.runningExercise = this.availableExercises.find(
            a => a.id === selectId
        );
        this.exerciseChange.next({ ...this.runningExercise });
    }
}
