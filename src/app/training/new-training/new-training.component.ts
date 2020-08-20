import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { TrainingService } from '../Training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui-service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];

  isLoading$: Observable<boolean>;
  constructor(
    private ts: TrainingService,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.ts.exercisesChange
      .subscribe((exresult: Exercise[]) => {
        this.exercises = exresult;
      });
    this.fetchAgain();
  }
  fetchAgain() {
    this.ts.fetchAvailableExercices();
  }
  onStartTraining(form: NgForm): void {
    this.ts.startExercise(form.value.exercise);
  }
}
