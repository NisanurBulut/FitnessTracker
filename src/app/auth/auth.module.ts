import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UIService } from '../shared/ui-service';
import { TrainingService } from '../training/Training.service';
import { StopTrainingComponent } from '../training/stop-training/stop-training.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule],
    exports: [],
    providers: [TrainingService, UIService],
    entryComponents: [StopTrainingComponent]
})
export class AuthModule { }
