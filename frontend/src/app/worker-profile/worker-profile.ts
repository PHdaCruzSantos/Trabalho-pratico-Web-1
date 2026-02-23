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
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ModalService } from '../services/modal.service';
import { RequestModalComponent } from './request-modal/request-modal.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.html',
  styleUrls: ['./worker-profile.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
})
export class WorkerProfileComponent implements OnInit {
  worker: WorkerProfile | undefined;
  currentUser: User | null = null;
  isOwnProfile = false;
  canReview = false;
  newReview = { rating: 5, comment: '' };
  submittingReview = false;
  activeTab: 'portfolio' | 'reviews' = 'portfolio';

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.workerService.getWorker(id);
          } else {
            return this.authService.currentUser$.pipe(
              switchMap((user) => {
                if (user && user.workerProfile?.id) {
                  return this.workerService.getWorker(user.workerProfile.id);
                }
                return of(undefined);
              })
            );
          }
        })
      )
      .subscribe((worker) => {
        this.worker = worker;
        this.authService.currentUser$.subscribe((user) => {
          this.currentUser = user;
          this.isOwnProfile = !!user && !!this.worker && user.id === this.worker.user.id;
          this.canReview =
            user?.role === Role.CONTRATANTE && !!this.worker && !this.isOwnProfile;
        });
      });
  }

  submitReview(): void {
    if (this.worker && this.currentUser && this.canReview && !this.submittingReview) {
      this.submittingReview = true;
      this.reviewService
        .addReview({
          ...this.newReview,
          workerId: this.worker.id,
        })
        .subscribe({
          next: (review) => {
            this.worker?.reviews.push({
              ...review,
              author: this.currentUser as User,
            });
            this.newReview = { rating: 5, comment: '' };
            this.notificationService.showSuccess(this.translate.instant('PROFILE.REVIEW_SUBMITTED'));
            this.submittingReview = false;
          },
          error: () => {
            this.notificationService.showError(this.translate.instant('PROFILE.REVIEW_ERROR'));
            this.submittingReview = false;
          },
        });
    }
  }

  openRequestModal(): void {
    if (this.worker && this.currentUser) {
      if (this.currentUser.role !== Role.CONTRATANTE) {
        this.notificationService.showError('Apenas perfis de clientes podem solicitar serviços.');
        return;
      }
      this.modalService.open(RequestModalComponent, {
        workerId: this.worker.id,
        workerName: this.worker.user.name
      });
    } else {
      this.notificationService.showError('Você precisa criar uma conta para contratar profissionais.');
    }
  }
}
