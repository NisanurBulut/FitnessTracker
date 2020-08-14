import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatIconModule
    ]
})
export class MaterialModule { }
