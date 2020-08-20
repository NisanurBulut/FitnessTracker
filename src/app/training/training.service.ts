import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { map, take } from 'rxjs/operators';
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

    finishedExercisesChange = new Subject<Exercise[]>();


    private exercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uis: UIService,
        private store: Store<fromTraining.State>) { }
        startExercise(selectId: string) {
        this.store.dispatch(new Training.StartExercise(selectId));
    }
    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopExercise(null));
        });
    }
    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopExercise(null));
        });
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
