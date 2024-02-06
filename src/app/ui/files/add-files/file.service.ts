import { Injectable } from '@angular/core';import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'})export class UploadService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post('http://68.178.203.55:8991/kyc-files/upload', formData, {
      headers: {
        'accept': '*/*'
      }
    });
  }
}