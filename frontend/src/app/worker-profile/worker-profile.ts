import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkerProfile } from '../models/worker-profile.model';
import { WorkerService } from '../services/worker';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { ReviewService } from '../services/review';
import { User, Role } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.html',
  styleUrls: ['./worker-profile.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class WorkerProfileComponent implements OnInit {

  worker: WorkerProfile | undefined;
  currentUser: User | null = null;
  canReview = false;
  newReview = { rating: 5, comment: '' };
  submittingReview = false;

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workerService.getWorker(id).subscribe(worker => {
        this.worker = worker;
        this.authService.currentUser$.subscribe(user => {
          this.currentUser = user;
          this.canReview = user?.role === Role.CONTRATANTE;
        });
      });
    }
  }

  submitReview(): void {
    if (this.worker && this.currentUser && this.canReview && !this.submittingReview) {
      this.submittingReview = true;
      this.reviewService.addReview({
        ...this.newReview,
        workerId: this.worker.id
      }).subscribe({
        next: review => {
          this.worker?.reviews.push({ ...review, author: this.currentUser as User });
          this.newReview = { rating: 5, comment: '' };
          this.notificationService.showSuccess('Avaliação enviada com sucesso!');
          this.submittingReview = false;
        },
        error: () => {
          this.notificationService.showError('Erro ao enviar avaliação.');
          this.submittingReview = false;
        }
      });
    }
  }
}