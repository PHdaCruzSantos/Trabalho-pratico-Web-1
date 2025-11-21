import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth';
import { ModalService } from '../../services/modal.service';
import { AuthComponent } from '../../auth/auth.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isScrolled = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  openAuthModal(initialState: 'login' | 'register' = 'login'): void {
    this.modalService.open(AuthComponent, { initialState });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
