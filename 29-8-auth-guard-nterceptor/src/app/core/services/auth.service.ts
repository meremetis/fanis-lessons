import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = true;
  jwt: string = 'this is a token'

  getJWT() {
    return this.jwt;
  }
}
