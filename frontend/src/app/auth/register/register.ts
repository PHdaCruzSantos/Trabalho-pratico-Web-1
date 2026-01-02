import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Role } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class RegisterComponent {
  @Output() switchMode = new EventEmitter<void>();
  name = '';
  email = '';
  password = '';
  role: Role = Role.CONTRATANTE;
  Role = Role;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {}

  register(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.authService.register(this.name, this.email, this.password, this.role).subscribe({
      next: (user) => {
        this.loading = false;
        this.notificationService.showSuccess(
          'NOTIFICATION.REGISTER_SUCCESS',
          'NOTIFICATION.REGISTER_TITLE'
        );
        this.modalService.close();
        if (user.role === Role.TRABALHADOR) {
          this.router.navigate(['/dashboard/edit-profile']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.notificationService.showError(
          err.error?.message || 'NOTIFICATION.REGISTER_ERROR',
          'NOTIFICATION.REGISTER_ERROR_TITLE'
        );
      },
    });
  }

  switchToLogin(): void {
    this.switchMode.emit();
  }
}