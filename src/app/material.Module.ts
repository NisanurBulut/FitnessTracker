import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }
