import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:5145/Product';

  constructor(private http: HttpClient) { }

  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/image/${imageName}`;
  }
}