import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../Training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, { static: false }) tsort: MatSort;

  constructor(private ts: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.ts.getAllExercises();
    console.log(this.dataSource.data);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.tsort;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
