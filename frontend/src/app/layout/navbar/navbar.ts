import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth';
import { ModalService } from '../../services/modal.service';
import { AuthComponent } from '../../auth/auth.component';
import { Theme, ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isScrolled = false;
  isDropdownOpen = false;
  currentTheme: Theme = 'system';

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private elementRef: ElementRef,
    private themeService: ThemeService,
    public translate: TranslateService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
    this.currentTheme = this.themeService.currentTheme;
  }

  toggleTheme(): void {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const nextTheme = themes[(themes.indexOf(this.currentTheme) + 1) % themes.length];
    this.themeService.setTheme(nextTheme);
    this.currentTheme = nextTheme;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openAuthModal(initialState: 'login' | 'register' = 'login'): void {
    this.modalService.open(AuthComponent, { initialState });
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/']);
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
