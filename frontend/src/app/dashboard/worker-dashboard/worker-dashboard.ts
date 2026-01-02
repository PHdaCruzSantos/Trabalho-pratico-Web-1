import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth';
import { User, Role } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.html',
  styleUrls: ['./worker-dashboard.css'],
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
})
export class WorkerDashboardComponent implements OnInit {
  currentUser: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user || undefined;
    });
  }

  get isWorker(): boolean {
    return this.currentUser?.role === Role.TRABALHADOR;
  }

  get isClient(): boolean {
    return this.currentUser?.role === Role.CONTRATANTE;
  }
}
