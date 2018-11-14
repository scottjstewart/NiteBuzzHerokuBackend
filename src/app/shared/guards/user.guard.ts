import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/data.auth-user.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authuser: AuthUserService,
    private snack: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): /*Observable<boolean> | Promise<boolean> |*/ boolean {
    if (this.authuser.loggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['login'])
      this.snack.open('You must be logged in to view that page', "OK", { duration: 2500 })
      return false
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state)
  }
}
