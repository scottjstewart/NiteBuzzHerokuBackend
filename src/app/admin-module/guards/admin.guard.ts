import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private jwt: JwtHelperService,
    private location: Location,
    private snackbar: MatSnackBar
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): /*Observable<boolean> | Promise<boolean> |*/ boolean {
    let decoded = this.jwt.decodeToken(localStorage.getItem('sessionToken'))
    let valid = !this.jwt.isTokenExpired(localStorage.getItem('sessionToken'))
    if (valid && decoded.status === 1) {
      return true
    } else {
      this.location.back()
      this.snackbar.open(`You are not authorized to view page ${ActivatedRouteSnapshot.toString()}`, 'Dismiss')
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

