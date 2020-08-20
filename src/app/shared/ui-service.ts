import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class UIService {

    constructor(private snackBar: MatSnackBar) {

    }
    showSnackBar(message, action, durationParam) {
        this.snackBar.open(message, action, {
            duration: durationParam
        });
    }
}
