import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../Training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  constructor(private ts: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.ts.getAllExercises();
  }

}
