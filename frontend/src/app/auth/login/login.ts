import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslateModule],
})
export class LoginComponent {
  @Output() switchMode = new EventEmitter<void>();
  email = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {}

  login(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        this.notificationService.showSuccess('NOTIFICATION.LOGIN_SUCCESS');
        this.modalService.close();
        if (user.role === 'TRABALHADOR') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.notificationService.showError(
          err.error?.message || 'NOTIFICATION.LOGIN_ERROR',
          'NOTIFICATION.LOGIN_ERROR_TITLE'
        );
      },
    });
  }

  switchToRegister(): void {
    this.switchMode.emit();
  }
}