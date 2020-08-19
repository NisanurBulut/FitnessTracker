import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { TrainingService } from '../training/Training.service';
import { UIService } from '../shared/ui-service';
@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private ts: TrainingService,
                private snackBar: MatSnackBar,
                private uis: UIService) { }

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
        this.uis.loadingStateSubject.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uis.loadingStateSubject.next(false);
            })
            .catch(error => {
                this.uis.loadingStateSubject.next(true);
                this.snackBar.open(error.message, null, {
                    duration: 3000
                });
            });
    }
    login(authData: AuthData) {
        this.uis.loadingStateSubject.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uis.loadingStateSubject.next(false);
            })
            .catch(error => {
                this.uis.loadingStateSubject.next(false);
                this.snackBar.open(error.message, null, {
                    duration: 3000
                });
            });

    }
    logout() {
        this.afAuth.auth.signOut();

    }

    isAuth() {
        return this.isAuthenticated;
    }
}
