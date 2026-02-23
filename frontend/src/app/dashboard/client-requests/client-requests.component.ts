import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RequestService, ServiceRequest } from '../../services/request';

@Component({
   selector: 'app-client-requests',
   standalone: true,
   imports: [CommonModule, RouterModule, TranslateModule],
   template: `
    <div class="max-w-4xl mx-auto pt-24 px-4 pb-20">
      <div class="mb-8">
        <h1 class="text-3xl font-display font-bold text-on-background-light dark:text-on-background-dark">{{ 'REQUESTS.TITLE' | translate }}</h1>
        <p class="text-on-surface-light/70 dark:text-on-surface-dark/70 mt-2">{{ 'REQUESTS.SUBTITLE' | translate }}</p>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center py-12">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && requests.length === 0" class="text-center py-16 bg-surface-light dark:bg-surface-dark rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto text-gray-400 mb-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <h3 class="text-xl font-bold text-on-surface-light dark:text-on-surface-dark mb-2">Nenhuma Solicitação</h3>
        <p class="text-on-surface-light/60 dark:text-on-surface-dark/60">Você ainda não solicitou serviços a nenhum profissional.</p>
        <button routerLink="/search" class="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all">Explorar Profissionais</button>
      </div>

      <!-- Requests List -->
      <div *ngIf="!loading && requests.length > 0" class="space-y-4">
        <div *ngFor="let req of requests" class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-outline-light dark:border-outline-dark shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-all hover:shadow-md hover:border-primary/30">
           <div class="flex items-center gap-4">
              <img [src]="'https://i.pravatar.cc/150?u=' + (req.worker?.user?.name || req.id)" class="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-surface-dark shadow-sm bg-gray-100">
              <div>
                 <h4 class="font-bold text-lg text-on-surface-light dark:text-on-surface-dark">{{ req.worker?.user?.name }}</h4>
                 <p class="font-bold text-sm text-primary mb-1">{{ req.title }}</p>
                 <p class="text-sm text-on-surface-light/60 dark:text-on-surface-dark/60 line-clamp-1 max-w-md">{{ req.description }}</p>
                 <p class="text-xs text-on-surface-light/40 dark:text-on-surface-dark/40 mt-1">{{ req.createdAt | date:'short' }}</p>
              </div>
           </div>
           
           <div class="flex flex-col md:flex-row items-end md:items-center gap-4">
              <div class="text-right md:text-left min-w-[120px]">
                 <span *ngIf="req.status === 'PENDING'" class="block text-center text-xs uppercase tracking-wider font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-900/30 px-3 py-1.5 rounded-xl">
                    Pendente
                 </span>
                 <span *ngIf="req.status === 'ACCEPTED'" class="block text-center text-xs uppercase tracking-wider font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-900/30 px-3 py-1.5 rounded-xl">
                    Aceito
                 </span>
                 <span *ngIf="req.status === 'REJECTED'" class="block text-center text-xs uppercase tracking-wider font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-900/30 px-3 py-1.5 rounded-xl">
                    Recusado
                 </span>
                 <span *ngIf="req.status === 'CANCELLED'" class="block text-center text-xs uppercase tracking-wider font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-500/10 border border-gray-200 dark:border-gray-700/50 px-3 py-1.5 rounded-xl">
                    Cancelado
                 </span>
              </div>
              
              <button *ngIf="req.status === 'PENDING'" 
                      (click)="cancelRequest(req)"
                      class="px-4 py-2 text-sm font-bold text-error hover:bg-error hover:text-white border border-error/50 rounded-xl transition-colors whitespace-nowrap">
                 {{ 'REQUESTS.CANCEL' | translate }}
              </button>
           </div>
        </div>
      </div>
    </div>
  `
})
export class ClientRequestsComponent implements OnInit {
   requests: ServiceRequest[] = [];
   loading = true;

   constructor(private requestService: RequestService) { }

   ngOnInit(): void {
      this.loadRequests();
   }

   loadRequests() {
      this.loading = true;
      this.requestService.getClientRequests().subscribe({
         next: (data) => {
            this.requests = data;
            this.loading = false;
         },
         error: (error) => {
            console.error('Error fetching requests', error);
            this.loading = false;
         }
      });
   }

   cancelRequest(req: ServiceRequest) {
      if (confirm('Tem certeza que deseja cancelar esta solicitação?')) {
         this.requestService.updateRequestStatus(req.id, 'CANCELLED').subscribe({
            next: () => {
               this.loadRequests(); // Reload list to show cancelled status
            },
            error: err => {
               console.error('Error cancelling request', err);
            }
         })
      }
   }
}
