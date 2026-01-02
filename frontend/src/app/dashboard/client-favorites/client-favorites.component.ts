import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-client-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="max-w-4xl mx-auto pt-24 px-4">
      <div class="mb-8">
        <h1 class="text-3xl font-display font-bold text-on-background-light dark:text-on-background-dark">{{ 'FAVORITES.TITLE' | translate }}</h1>
        <p class="text-on-surface-light/70 dark:text-on-surface-dark/70 mt-2">{{ 'FAVORITES.SUBTITLE' | translate }}</p>
      </div>

      <!-- Empty State -->
      <div *ngIf="favorites.length === 0" class="flex flex-col items-center justify-center py-16 bg-surface-light dark:bg-surface-dark rounded-2xl border border-outline-light dark:border-outline-dark">
        <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-on-surface-light dark:text-on-surface-dark">{{ 'FAVORITES.EMPTY_TITLE' | translate }}</h3>
        <p class="text-on-surface-light/60 dark:text-on-surface-dark/60 mt-1 max-w-sm text-center">{{ 'FAVORITES.EMPTY_DESC' | translate }}</p>
        <a routerLink="/" class="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all duration-200">
          {{ 'FAVORITES.BROWSE' | translate }}
        </a>
      </div>

      <!-- Favorites Grid (Mock) -->
      <div *ngIf="favorites.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Mock Item -->
        <div *ngFor="let worker of favorites" class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-outline-light dark:border-outline-dark overflow-hidden group hover:shadow-md transition-all duration-200">
          <div class="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
            <button class="absolute top-2 right-2 p-2 bg-white/10 backdrop-blur-md rounded-full text-red-500 hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
          <div class="p-4 mt-8 relative">
             <div class="absolute -top-12 left-4 w-16 h-16 rounded-xl bg-white dark:bg-gray-800 p-1 shadow-md">
                <img [src]="worker.avatar" class="w-full h-full object-cover rounded-lg">
             </div>
             <h3 class="font-bold text-lg text-on-surface-light dark:text-on-surface-dark">{{ worker.name }}</h3>
             <p class="text-sm text-primary font-medium">{{ worker.category }}</p>
             <div class="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                </svg>
                <span>{{ worker.rating }}</span>
                <span class="text-on-surface-light/40 dark:text-on-surface-dark/40">({{ worker.reviews }})</span>
             </div>
             <button class="w-full mt-4 py-2 border border-outline-light dark:border-outline-dark rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                {{ 'SEARCH.VIEW_PROFILE' | translate }}
             </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientFavoritesComponent implements OnInit {
  favorites: any[] = []; // Mock data type

  constructor() {}

  ngOnInit(): void {
    // Mock data
    this.favorites = [
      {
        id: '1',
        name: 'Maria Silva',
        category: 'Eletricista',
        rating: 4.8,
        reviews: 24,
        avatar: 'https://i.pravatar.cc/150?u=1'
      },
       {
        id: '2',
        name: 'João Santos',
        category: 'Encanador',
        rating: 4.9,
        reviews: 42,
        avatar: 'https://i.pravatar.cc/150?u=2'
      }
    ];
  }
}
