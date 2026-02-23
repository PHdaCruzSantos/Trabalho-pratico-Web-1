import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RequestService, ServiceRequest } from '../../services/request';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.html',
  styleUrls: ['./job-requests.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class JobRequestsComponent implements OnInit {

  jobRequests: ServiceRequest[] = [];
  loading = true;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.requestService.getWorkerRequests().subscribe({
      next: (data) => {
        this.jobRequests = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching worker requests', err);
        this.loading = false;
      }
    });
  }

  acceptRequest(request: ServiceRequest): void {
    if (confirm('Tem certeza que deseja aceitar esta solicitação? Ela não poderá ser cancelada depois!')) {
      this.requestService.updateRequestStatus(request.id, 'ACCEPTED').subscribe({
        next: () => this.loadRequests(),
        error: (err) => console.error('Error accepting request', err)
      });
    }
  }

  rejectRequest(request: ServiceRequest): void {
    if (confirm('Tem certeza que deseja recusar esta solicitação definitivamente?')) {
      this.requestService.updateRequestStatus(request.id, 'REJECTED').subscribe({
        next: () => this.loadRequests(),
        error: (err) => console.error('Error rejecting request', err)
      });
    }
  }
}
