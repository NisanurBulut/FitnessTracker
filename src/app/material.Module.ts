import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
} from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule
    ]
})
export class MaterialModule { }
