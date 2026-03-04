import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  sidebarOpen = false;

  constructor(
    public themeService: ThemeService,
    public languageService: LanguageService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getLanguageText(): string {
    return this.languageService.getCurrentLanguage().toUpperCase();
  }

  getThemeIcon(): string {
    return this.themeService.getCurrentTheme() === 'light' 
      ? 'bi-moon-stars' 
      : 'bi-sun';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    window.dispatchEvent(new CustomEvent('toggle-sidebar', { 
      detail: { open: this.sidebarOpen } 
    }));
  }
}