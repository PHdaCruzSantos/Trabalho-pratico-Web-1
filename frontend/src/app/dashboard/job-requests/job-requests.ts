import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type JobRequestStatus = 'pending' | 'accepted' | 'rejected';

interface JobRequest {
  id: number;
  title: string;
  description: string;
  clientName: string;
  status: JobRequestStatus;
}

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.html',
  styleUrls: ['./job-requests.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class JobRequestsComponent implements OnInit {

  jobRequests: JobRequest[] = [];

  ngOnInit(): void {
    this.jobRequests = [
      {
        id: 1,
        title: 'Desenvolvimento de Landing Page',
        description: 'Preciso de uma landing page para meu novo produto. O design já está pronto.',
        clientName: 'Ana Clara',
        status: 'pending'
      },
      {
        id: 2,
        title: 'Conserto de Encanamento',
        description: 'Vazamento na pia da cozinha. Urgente!',
        clientName: 'Pedro Pascal',
        status: 'pending'
      },
      {
        id: 3,
        title: 'Aula de Violão',
        description: 'Gostaria de agendar uma aula de violão para iniciantes.',
        clientName: 'Joana Marques',
        status: 'accepted'
      },
      {
        id: 4,
        title: 'Formatação de Computador',
        description: 'Meu computador está muito lento, preciso formatar e instalar o Windows 11.',
        clientName: 'Lucas Moura',
        status: 'rejected'
      }
    ];
  }

  acceptRequest(request: JobRequest): void {
    request.status = 'accepted';
  }

  rejectRequest(request: JobRequest): void {
    request.status = 'rejected';
  }
}
