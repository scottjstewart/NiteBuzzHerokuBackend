import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private jwt: JwtHelperService
  ) { }

  isAdmin() {
    return this.jwt.decodeToken(tokenGetter()).status === 1
  }

}
