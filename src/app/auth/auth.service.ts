import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) { }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        // yeni verisi true olacak böylece
        this.authSuccessfully();
    }
    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }
    logout() {
        this.user = null;
        this.authChange.next(false);
    }
    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.user != null;
    }
    private authSuccessfully() {
        this.authSuccessfully(); this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
