import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../Training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui-service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exercisesSubscription: Subscription;
  private loadingSubscription: Subscription;
  isLoading = true;
  constructor(private ts: TrainingService, private uis: UIService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.uis.loadingStateSubject.subscribe(isload => {
      this.isLoading = isload;
    });
    this.exercisesSubscription = this.ts.exercisesChange
      .subscribe((exresult: Exercise[]) => {
        this.isLoading = false;
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
  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
