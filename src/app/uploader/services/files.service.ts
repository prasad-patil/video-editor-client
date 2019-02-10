import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private httpClient: HttpClient) {}

  downloadPDF(filename, filetype): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
    return this.httpClient.get('http://127.0.0.1:3000/file/' + filename, {
      headers,
      responseType: 'blob' as 'json'
    });
  }

  showFileNames() {
    return this.httpClient.get('http://127.0.0.1:3000/files');
  }
}
