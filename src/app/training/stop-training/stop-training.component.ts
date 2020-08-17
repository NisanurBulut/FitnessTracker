import { Component } from '@angular/core';
import { MatDialogActions } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: '<h1 mat-dialog-title>Emin Misiniz ?</h1>'
        + '<mat-dialog-actions>'
        + '<button mat-button [mat-dialog-close]="true"> Evet </button>'
        + '<button mat-button [mat-dialog-close]="false"> Hayır </button>'
        + '</mat-dialog-actions>',

})
export class StopTrainingComponent {
}
