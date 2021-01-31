import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/Training.service';
import { UIService } from '../shared/ui-service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from './../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private ts: TrainingService,
        private uis: UIService,
        private store: Store<fromRoot.State>) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.ts.cancelSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/login']);
            }
        });
    }
    registerUser(authData: AuthData) {
        // this.uis.loadingStateSubject.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                // this.uis.loadingStateSubject.next(true);
                this.store.dispatch(new UI.StartLoading());
                this.uis.showSnackBar(error.message, null, 3000);
            });
    }
    login(authData: AuthData) {
        // this.uis.loadingStateSubject.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uis.showSnackBar(error.message, null, 3000);
            });

    }
    logout() {
        this.afAuth.auth.signOut();
    }
}
