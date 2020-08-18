import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { TrainingService } from '../Training.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // exercises: Exercise[] = [];
  exercises: Observable<any>;
  constructor(private ts: TrainingService, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.db.collection('availableExercises')
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });
    //  this.exercises = this.ts.getAvailableExercices();
  }
  onStartTraining(form: NgForm): void {
    this.ts.startExercise(form.value.exercise);
  }
}
