import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../Training.service';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();


  @ViewChild(MatSort, { static: false }) tsort: MatSort;
  @ViewChild(MatPaginator, { static: false }) tPaginator: MatPaginator;
  constructor(private ts: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises)
      .subscribe((exerRes: Exercise[]) => {
        this.dataSource.data = exerRes;
      });
    this.ts.fetchComplatedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.tsort;
    this.dataSource.paginator = this.tPaginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
