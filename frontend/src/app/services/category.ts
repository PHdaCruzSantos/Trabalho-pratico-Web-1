import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceCategory } from '../models/service-category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(this.apiUrl);
  }
}