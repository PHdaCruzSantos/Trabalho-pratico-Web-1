import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: RequestStatus;
  clientId: string;
  workerId: string;
  createdAt: string;
  updatedAt: string;
  worker?: any;
  client?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.apiUrl}/requests`;

  constructor(private http: HttpClient) { }

  createRequest(data: { title: string; description: string; workerId: string }): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.apiUrl, data);
  }

  getClientRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${this.apiUrl}/client`);
  }

  getWorkerRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${this.apiUrl}/worker`);
  }

  updateRequestStatus(id: string, status: RequestStatus): Observable<ServiceRequest> {
    return this.http.patch<ServiceRequest>(`${this.apiUrl}/${id}/status`, { status });
  }
}
