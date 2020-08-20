import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui-service';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    exercisesChange = new Subject<Exercise[]>();
    finishedExercisesChange = new Subject<Exercise[]>();

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    private availableExercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uis: UIService,
        private store: Store<fromTraining.State>) { }
    startExercise(selectId: string) {
        this.store.dispatch(new Training.StartExercise(selectId));
    }
    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.store.dispatch(new Training.StopExercise(this.runningExercise));
    }
    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: 'cancelled'
        });
        this.store.dispatch(new Training.StopExercise(this.runningExercise));
    }
    fetchAvailableExercices() {
        this.store.dispatch(new UI.StartLoading());
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
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));

            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uis.showSnackBar(error.message, null, 3000);
                this.store.dispatch(new Training.SetAvailableTrainings(null));
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
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
            }, error => {
                this.store.dispatch(new Training.SetFinishedTrainings(null));
            }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises')
            .add(exercise);
    }
}
