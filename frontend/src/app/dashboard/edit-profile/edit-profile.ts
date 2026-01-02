import { Component, OnInit } from '@angular/core';
import { WorkerProfile } from '../../models/worker-profile.model';
import { AuthService } from '../../services/auth';
import { WorkerService } from '../../services/worker';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCategory } from '../../models/service-category.model';
import { CategoryService } from '../../services/category';
import { NotificationService } from '../../services/notification.service';
import { forkJoin } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class EditProfileComponent implements OnInit {

  worker: WorkerProfile | undefined;
  allCategories: ServiceCategory[] = [];
  selectedCategories: { [key: string]: boolean } = {};
  loading = false;

  constructor(
    private authService: AuthService,
    private workerService: WorkerService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.allCategories = categories;
    });

    this.authService.getMe().subscribe(user => {
      if (user.workerProfile) {
        this.workerService.getWorker(user.workerProfile.id).subscribe(worker => {
          this.worker = worker;
          this.allCategories.forEach(category => {
            this.selectedCategories[category.id] = this.worker?.categories.some(c => c.id === category.id) ?? false;
          });
        });
      }
    });
  }

  save(): void {
    if (!this.worker || this.loading) {
      return;
    }
    this.loading = true;

    const selectedCategoryIds = Object.keys(this.selectedCategories).filter(id => this.selectedCategories[id]);
    const userData = { name: this.worker.user.name, email: this.worker.user.email };
    const profileData = {
      bio: this.worker.bio,
      location: this.worker.location,
      categories: selectedCategoryIds
    };

    const updateUser$ = this.authService.updateMe(userData);
    const updateProfile$ = this.workerService.updateWorkerProfile(profileData);

    forkJoin([updateUser$, updateProfile$]).subscribe({
      next: ([updatedUser, updatedProfile]) => {
        if (this.worker) {
          this.worker.user = { ...this.worker.user, ...updatedUser };
          this.worker.bio = updatedProfile.bio;
          this.worker.location = updatedProfile.location;
          this.worker.categories = updatedProfile.categories;
        }
        this.notificationService.showSuccess(this.translate.instant('DASHBOARD.EDIT_PROFILE.SUCCESS'));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error updating profile', err);
        this.notificationService.showError(this.translate.instant('DASHBOARD.EDIT_PROFILE.ERROR'));
        this.loading = false;
      }
    });
  }

  onCategoryChange(categoryId: string, isChecked: boolean): void {
    this.selectedCategories[categoryId] = isChecked;
  }
}