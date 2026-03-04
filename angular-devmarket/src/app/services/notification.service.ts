import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private languageService: LanguageService) {}

  notify(messageKey: string) {
    const translatedMessage = this.languageService.translate(messageKey) || messageKey;
    const toast = document.createElement('div');
    toast.className = 'toast-container';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="bi bi-exclamation-circle"></i>
        <span>${translatedMessage}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { if (document.body.contains(toast)) document.body.removeChild(toast); }, 500);
    }, 3000);
  }

  confirm(messageKey: string): Promise<boolean> {
    return new Promise((resolve) => {
      const translatedMessage = this.languageService.translate(messageKey) || messageKey;

      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4';
      
      overlay.innerHTML = `
        <div class="glass-card max-w-sm w-full p-6 text-center animate-in fade-in zoom-in duration-300">
          <i class="bi bi-question-circle text-4xl text-cyan-400 mb-4 block"></i>
          <p class="text-white text-lg mb-6">${translatedMessage}</p>
          <div class="flex gap-4">
            <button id="confirm-cancel" class="btn-secondary flex-1 py-2">Cancelar</button>
            <button id="confirm-yes" class="btn-primary flex-1 py-2">Sim</button>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      overlay.querySelector('#confirm-yes')?.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(true);
      });

      overlay.querySelector('#confirm-cancel')?.addEventListener('click', () => {
        document.body.removeChild(overlay);
        resolve(false);
      });
    });
  }
}