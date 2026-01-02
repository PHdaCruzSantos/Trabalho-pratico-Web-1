import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class ClientProfileComponent implements OnInit {
  user: User | null = null;
  name: string = '';
  email: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.name = user.name;
        this.email = user.email;
      }
    });
  }

  saveProfile(): void {
    if (!this.user) return;

    this.loading = true;
    this.authService.updateProfile({ name: this.name, email: this.email }).subscribe({
      next: (response) => {
        this.loading = false;
        this.notificationService.showSuccess(this.translate.instant('NOTIFICATION.PROFILE_UPDATE_SUCCESS'));
        // Update local user state if needed, though authService should handle it if it updates the subject
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.showError(this.translate.instant('NOTIFICATION.PROFILE_UPDATE_ERROR'));
      }
    });
  }
}
