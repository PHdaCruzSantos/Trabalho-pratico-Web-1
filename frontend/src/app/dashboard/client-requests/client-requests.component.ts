import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-client-requests',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="max-w-4xl mx-auto pt-24 px-4">
      <div class="mb-8">
        <h1 class="text-3xl font-display font-bold text-on-background-light dark:text-on-background-dark">{{ 'REQUESTS.TITLE' | translate }}</h1>
        <p class="text-on-surface-light/70 dark:text-on-surface-dark/70 mt-2">{{ 'REQUESTS.SUBTITLE' | translate }}</p>
      </div>

      <!-- Requests List (Mock) -->
      <div class="space-y-4">
        <!-- Mock Pending Request -->
        <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-outline-light dark:border-outline-dark shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
           <div class="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?u=1" class="w-12 h-12 rounded-full object-cover">
              <div>
                 <h4 class="font-bold text-lg text-on-surface-light dark:text-on-surface-dark">Maria Silva</h4>
                 <p class="text-sm text-on-surface-light/60 dark:text-on-surface-dark/60">Reparo na fiação elétrica</p>
              </div>
           </div>
           
           <div class="flex flex-col md:flex-row items-end md:items-center gap-4">
              <div class="text-right md:text-left">
                 <span class="block text-xs uppercase tracking-wider font-bold text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full">
                    {{ 'REQUESTS.STATUS.PENDING' | translate }}
                 </span>
                 <span class="text-xs text-on-surface-light/40 dark:text-on-surface-dark/40 mt-1 block">
                    {{ 'REQUESTS.SENT_AGO' | translate:{days: 2} }}
                 </span>
              </div>
              <button class="px-4 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-lg transition-colors">
                 {{ 'REQUESTS.CANCEL' | translate }}
              </button>
           </div>
        </div>

        <!-- Mock Accepted Request -->
         <div class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-outline-light dark:border-outline-dark shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
           <div class="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?u=2" class="w-12 h-12 rounded-full object-cover">
              <div>
                 <h4 class="font-bold text-lg text-on-surface-light dark:text-on-surface-dark">João Santos</h4>
                 <p class="text-sm text-on-surface-light/60 dark:text-on-surface-dark/60">Instalação de torneira</p>
              </div>
           </div>
           
           <div class="flex flex-col md:flex-row items-end md:items-center gap-4">
              <div class="text-right md:text-left">
                 <span class="block text-xs uppercase tracking-wider font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                    {{ 'REQUESTS.STATUS.ACCEPTED' | translate }}
                 </span>
                 <span class="text-xs text-on-surface-light/40 dark:text-on-surface-dark/40 mt-1 block">
                    {{ 'REQUESTS.SCHEDULED_FOR' | translate:{date: 'Dec 20'} }}
                 </span>
              </div>
              <button class="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                 {{ 'REQUESTS.MESSAGE' | translate }}
              </button>
           </div>
        </div>
      </div>
    </div>
  `
})
export class ClientRequestsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
