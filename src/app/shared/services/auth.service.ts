import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subject } from 'rxjs';
import { TokenPayload } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static NAME = 'token';
  static TOKEN: string;
  static USER = 'user';
  public token!: string;
  tokenPayload: TokenPayload | undefined;
  username!: string;
  userAction: Subject<void> = new Subject();
  permissions!: any[] ;

  constructor(public jwtHelper: JwtHelperService) {
    this.token = AuthService.TOKEN = <string>this.getToken();
    this.setTokenPayload(this.token);
    if (!this.tokenPayload) return;
    this.permissions = this.tokenPayload.authorities;
  }

  public getTokenPayload(token: string) {
    return this.jwtHelper.decodeToken(token);
    sessionStorage.setItem('user', JSON.stringify(token));
  }

  public setTokenPayload(token: string) {
    this.tokenPayload = this.getTokenPayload(token);
    if (this.tokenPayload) return;
    const data: any = {};
    this.tokenPayload = data;
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  public saveToken(token: string) {
    sessionStorage.setItem(AuthService.NAME, token);
    const userDetails = this.jwtHelper.decodeToken(token ? token :'');
    sessionStorage.setItem(AuthService.USER, JSON.stringify(userDetails.resource_access.Frontend));
  }

  public getToken() {
    return sessionStorage.getItem(AuthService.NAME);
  }

  public clearToken() {
    sessionStorage.clear();
  }

  get getAction(): Observable<void> {
    return this.userAction.asObservable();
  };

  loadAction() {
    this.userAction.next();
  }
  public getUser(){
    const userString = sessionStorage.getItem(AuthService.USER) ?? '{}';
    return JSON.parse(userString);
  }
}
