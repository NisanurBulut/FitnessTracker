import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UIService } from '../shared/ui-service';
import { TrainingService } from '../training/Training.service';
import { StopTrainingComponent } from '../training/stop-training/stop-training.component';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule,
        AngularFireAuthModule],
    exports: [],
    providers: [TrainingService, UIService],
    entryComponents: [StopTrainingComponent]
})
export class AuthModule { }
