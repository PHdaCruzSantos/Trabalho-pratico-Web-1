import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
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
        this.notificationService.showSuccess('Login realizado com sucesso!');
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
          err.error?.message || 'Credenciais inválidas. Por favor, tente novamente.',
          'Erro de Login'
        );
      },
    });
  }
}