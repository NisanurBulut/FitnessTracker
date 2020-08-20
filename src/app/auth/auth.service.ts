import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/Training.service';
import { UIService } from '../shared/ui-service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private ts: TrainingService,
                private uis: UIService,
                private store: Store<{ ui: fromApp.State }>) { }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.ts.cancelSubscriptions();
                this.authChange.next(false);
                this.isAuthenticated = false;
                this.router.navigate(['']);
            }
        });
    }
    registerUser(authData: AuthData) {
        // this.uis.loadingStateSubject.next(true);
        this.store.dispatch({ type: 'START_LOADING' });
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch({ type: 'STOP_LOADING' });
            })
            .catch(error => {
                // this.uis.loadingStateSubject.next(true);
                this.store.dispatch({ type: 'START_LOADING' });
                this.uis.showSnackBar(error.message, null, 3000);
            });
    }
    login(authData: AuthData) {
        // this.uis.loadingStateSubject.next(true);
        this.store.dispatch({ type: 'START_LOADING' });
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch({ type: 'STOP_LOADING' });
            })
            .catch(error => {
                // this.uis.loadingStateSubject.next(false);
                this.store.dispatch({ type: 'STOP_LOADING' });
                this.uis.showSnackBar(error.message, null, 3000);
            });

    }
    logout() {
        this.afAuth.auth.signOut();
    }
    isAuth() {
        return this.isAuthenticated;
    }
}
