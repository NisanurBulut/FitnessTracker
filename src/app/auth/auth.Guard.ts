import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }
    }
    canLoad(route: Route) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            return this.router.navigate(['/login']);
        }
    }
}
