import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../Training.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  constructor(private ts: TrainingService) {
  }
  /*
   */
  ngOnInit() {
    this.exercisesSubscription = this.ts.exercisesChange.subscribe(exresult => {
      this.exercises = exresult;
    });
    this.ts.fetchAvailableExercices();

    console.log(this.exercises);
  }
  onStartTraining(form: NgForm): void {
    this.ts.startExercise(form.value.exercise);
  }
  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }
}
