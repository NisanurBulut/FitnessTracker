import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router, private afAuth: AngularFireAuth) { }

    registerUser(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        // yeni verisi true olacak böylece
        this.authSuccessfully();
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
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['']);
    }
    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user != null;
    }
    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
