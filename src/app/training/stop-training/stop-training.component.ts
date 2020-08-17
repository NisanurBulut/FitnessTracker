import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: '<h1 mat-dialog-title>Emin Misiniz ?</h1>'
        + '<mat-dialog-content>zaten {{passedData.progress}} % tamamladın.</mat-dialog-content>'
        + '<mat-dialog-actions>'
        + '<button mat-button [mat-dialog-close]="true"> Evet </button>'
        + '<button mat-button [mat-dialog-close]="false"> Hayır </button>'
        + '</mat-dialog-actions>',

})
export class StopTrainingComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
