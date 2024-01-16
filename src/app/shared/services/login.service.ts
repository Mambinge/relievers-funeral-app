import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Location} from "@angular/common";
import { API } from '../data';

@Injectable({
  providedIn: 'root'
})


export class LoginService  {
  constructor(public location:Location,private http:HttpClient) { }

  public login(user:string,password:string):Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
     'application/x-www-form-urlencoded;'
    );

    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', user)
    .set('password', password)
    .set('client_id', 'Frontend');

    return this.http.post(`${API.KEYCLOACK_SERVICE}protocol/openid-connect/token`, body , {headers: headers })

  }

  public logout()  {
    sessionStorage.clear();
    location.reload()
  }



  public getIsLogged(): boolean {
    return (localStorage.getItem('token')!=null);
  }

  public getUsername() {
    if(this.getIsLogged()){
      const token = localStorage!.getItem('token');
      const payload = token!.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      return payloadDecoded.preferred_username ;
    }

  }

  public getIsAdmin() {
    const token = localStorage.getItem('token');
    const payload = token!.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    return payloadDecoded.realm_access.roles.indexOf('admin') !== -1;
  }

}
