import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.Guard';

const routes: Routes = [
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class TrainingRoutingModule { }
