import { Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/shared/services';
@Injectable({
  providedIn: 'root'})export class UploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${API.CLIENTS}kyc-files/upload`, formData, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}