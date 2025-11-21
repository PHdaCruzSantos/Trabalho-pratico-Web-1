import { Component, OnInit } from '@angular/core';
import { WorkerProfile } from '../../models/worker-profile.model';
import { AuthService } from '../../services/auth';
import { WorkerService } from '../../services/worker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-manage-portfolio',
  templateUrl: './manage-portfolio.html',
  styleUrls: ['./manage-portfolio.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManagePortfolioComponent implements OnInit {

  worker: WorkerProfile | undefined;
  newPortfolioItem = { title: '', description: '', imageUrl: '' };
  loading = false;
  removing: { [key: string]: boolean } = {};

  constructor(
    private authService: AuthService,
    private workerService: WorkerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe(user => {
      if (user && user.workerProfile) {
        this.workerService.getWorker(user.workerProfile.id).subscribe(worker => {
          this.worker = worker;
        });
      }
    });
  }

  addPortfolioItem(): void {
    if (this.worker && !this.loading) {
      this.loading = true;
      this.workerService.addPortfolioItem(this.newPortfolioItem).subscribe({
        next: (item) => {
          this.worker?.portfolio.push(item);
          this.newPortfolioItem = { title: '', description: '', imageUrl: '' };
          this.notificationService.showSuccess('Item adicionado com sucesso!');
          this.loading = false;
        },
        error: () => {
          this.notificationService.showError('Erro ao adicionar o item.');
          this.loading = false;
        }
      });
    }
  }

  removePortfolioItem(id: string): void {
    if (this.worker && !this.removing[id]) {
      this.removing[id] = true;
      this.workerService.removePortfolioItem(id).subscribe({
        next: () => {
          if (this.worker) {
            this.worker.portfolio = this.worker.portfolio.filter(p => p.id !== id);
            this.notificationService.showSuccess('Item removido com sucesso!');
          }
          this.removing[id] = false;
        },
        error: () => {
          this.notificationService.showError('Erro ao remover o item.');
          this.removing[id] = false;
        }
      });
    }
  }

}