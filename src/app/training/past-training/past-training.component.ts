import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../Training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSuscription: Subscription;

  @ViewChild(MatSort, { static: false }) tsort: MatSort;
  @ViewChild(MatPaginator, { static: false }) tPaginator: MatPaginator;
  constructor(private ts: TrainingService) { }

  ngOnInit() {
    this.exChangedSuscription = this.ts.finishedExercisesChange.subscribe((exerRes: Exercise[]) => {
      this.dataSource.data = exerRes;
    });
    this.ts.fetchComplatedOrCancelledExercises();
  }
  ngOnDestroy() {
    if (this.exChangedSuscription) {
      this.exChangedSuscription.unsubscribe();
    }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.tsort;
    this.dataSource.paginator = this.tPaginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
