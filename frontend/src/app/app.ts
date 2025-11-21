import { Component, OnInit, Renderer2, signal } from '@angular/core';
import { AuthService } from './services/auth';
import { Role } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('frontend');

  constructor(private authService: AuthService, private renderer: Renderer2) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        if (user.role === Role.TRABALHADOR) {
          this.renderer.addClass(document.body, 'theme-worker');
          this.renderer.removeClass(document.body, 'theme-contractor');
        } else if (user.role === Role.CONTRATANTE) {
          this.renderer.addClass(document.body, 'theme-contractor');
          this.renderer.removeClass(document.body, 'theme-worker');
        }
      } else {
        this.renderer.removeClass(document.body, 'theme-worker');
        this.renderer.removeClass(document.body, 'theme-contractor');
      }
    });
  }
}
