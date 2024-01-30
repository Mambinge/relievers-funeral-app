import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, empty, map } from 'rxjs';



export class DefaultService<T> {

  public getAll(url:string): Observable<any> {
    return this.defaultHttpClient.get<any[]>(`${this.baseUrl}${url}`)
      .pipe(catchError(() => empty())); 
     
    }



  // public getFromUrl(url: string): Observable<any> {
  //   return this.defaultHttpClient.get(`${this.baseUrl}${url}`)
  //     .pipe(catchError(() => empty()));
  // }

  public getFromUrl(url: string): Observable<any> {
    return this.defaultHttpClient.get(`${this.baseUrl}${url}`)
      .pipe(catchError(() => empty()));
  }

  public get(id: number | string,body:any): Observable<T> {
    return this.getFromUrl(`${id}`);
  }

  public post(body: T): Observable<any> {
    return this.postToUrl('', body);
  }

  public postToUrl(url: string, body: any): Observable<any> {
    return this.defaultHttpClient.post(`${this.baseUrl}${url}`, body, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => response.body));
  }

  public update(body: T): Observable<any> {
    return this.updateToUrl('', body);
  }

  public updateToUrl(url: string, body: any): Observable<any> {
    return this.defaultHttpClient.put(`${this.baseUrl}${url}`, body, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => response.body));
  }


  public delete(url: string): Observable<any> {
    return this.defaultHttpClient.delete(`${this.baseUrl}${url}`, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => response.body));
  }

  public search(parameter: any): Observable<T> {
    return this.getFromUrl(`?${parameter}`);
  }

  constructor(public defaultHttpClient: HttpClient, public baseUrl: string) {

   }


}
