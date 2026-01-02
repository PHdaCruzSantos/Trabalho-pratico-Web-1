import { Component, OnInit, signal } from '@angular/core';
import { ThemeService } from './services/theme.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('frontend');

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['pt-BR', 'en-US']);
    // this.translate.setDefaultLang('pt-BR');
    this.translate.use('pt-BR');
  }

  ngOnInit() {
    this.themeService.initTheme();
  }
}
