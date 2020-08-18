import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private isAuthenticated = false;
    constructor(private router: Router, private afAuth: AngularFireAuth) { }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error);
            });
    }
    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error);
            });

    }
    logout() {
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['']);
    }

    isAuth() {
        return this.isAuthenticated;
    }
    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
