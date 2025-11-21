// frontend/scr/service/worker.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkerProfile } from '../models/worker-profile.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PortfolioItem } from '../models/portfolio-item.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private apiUrl = `${environment.apiUrl}/workers`;

  constructor(private http: HttpClient) {}

  getWorkers(params?: {
    category?: string;
    name?: string;
    location?: string;
  }): Observable<WorkerProfile[]> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.category) {
        httpParams = httpParams.set('category', params.category);
      }
      if (params.name) {
        httpParams = httpParams.set('name', params.name);
      }
      if (params.location) {
        httpParams = httpParams.set('location', params.location);
      }
    }
    return this.http.get<WorkerProfile[]>(this.apiUrl, { params: httpParams });
  }

  getWorker(id: string): Observable<WorkerProfile> {
    return this.http.get<WorkerProfile>(`${this.apiUrl}/${id}`);
  }

  updateWorkerProfile(profileData: {
    bio?: string;
    location?: string;
    categories?: string[];
  }): Observable<WorkerProfile> {
    return this.http.post<WorkerProfile>(`${environment.apiUrl}/profiles`, profileData);
  }

  addPortfolioItem(item: {
    title: string;
    description: string;
    imageUrl: string;
  }): Observable<PortfolioItem> {
    return this.http.post<PortfolioItem>(`${environment.apiUrl}/profiles/portfolio`, item);
  }

  removePortfolioItem(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/profiles/portfolio/${id}`);
  }
}
