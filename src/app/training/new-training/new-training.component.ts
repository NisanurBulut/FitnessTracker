import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../Training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];
  constructor(private ts: TrainingService) {
  }

  ngOnInit() {
    this.exercises = this.ts.getAvailableExercices();
  }
  onStartTraining(form: NgForm): void {
    this.ts.startExercise(form.value.exercise.id);
  }
}
