import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private apiUrl = 'http://127.0.0.1:8080/upload';  // API endpoint for OCR processing

  constructor(private http: HttpClient) {}

  // Method to process OCR for a given image file
  processImage(file: File, costType: string): Observable<any> {
    const formData = new FormData();
    formData.append('costType', costType);
    formData.append('file', file, file.name);

    // Send the request to the OCR service
    return this.http.post<any>(this.apiUrl, formData);
  }
}