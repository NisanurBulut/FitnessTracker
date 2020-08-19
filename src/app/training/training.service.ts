import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription} from 'rxjs/Subscription';

@Injectable()
export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    exercisesChange = new Subject<Exercise[]>();
    finishedExercisesChange = new Subject<Exercise[]>();

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    private availableExercises: Exercise[] = [];
    private finishedExercises: Exercise[] = [];
    private fbSubs:Subscription[]=[];

    constructor(private db: AngularFirestore) { }
    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }
    cancelExercise(progress: number) {
        this.addDataToDatabase({
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
        this.fbSubs.push(this.db.collection('availableExercises')
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
            }, error => {
                console.log(error);
            }));
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    getAllExercises() {
        return this.exercises.slice();
    }
    fetchComplatedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.finishedExercises = exercises;
                this.finishedExercisesChange.next(exercises);
            }, error=>{
                console.log(error);
            }));
    }
    startExercise(selectId: string) {
        // this.db.doc('availableExercises/'+selectId)
        // .update({lastSelected:new Date()});
        this.runningExercise = this.availableExercises.find(
            a => a.id === selectId
        );
        this.exerciseChange.next({ ...this.runningExercise });
    }
    cancelSubscriptions(){
        this.fbSubs.forEach(sub=>sub.unsubscribe());
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
            .add(exercise);
    }
}
