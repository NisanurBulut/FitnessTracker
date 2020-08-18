import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../Training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog, private ts: TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }
  startOrResumeTimer() {
    const step = this.ts.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.ts.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ts.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
