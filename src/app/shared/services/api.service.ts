import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultService } from './default.service';



@Injectable()
export class ApiService extends DefaultService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, ``);
  }



}
