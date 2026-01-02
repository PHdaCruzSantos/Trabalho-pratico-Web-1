import { Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private colorTheme = signal<Theme>('system');

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      this.colorTheme.set(storedTheme);
    }
    this.updateTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.colorTheme() === 'system') {
        this.updateTheme();
      }
    });
  }

  get currentTheme(): Theme {
    return this.colorTheme();
  }

  setTheme(theme: Theme): void {
    this.colorTheme.set(theme);
    localStorage.setItem('theme', theme);
    this.updateTheme();
  }

  private updateTheme(): void {
    const theme = this.colorTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}
