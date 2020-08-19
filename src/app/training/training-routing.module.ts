import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.Guard';

const routes: Routes = [
    { path: '', component: TrainingComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule { }
