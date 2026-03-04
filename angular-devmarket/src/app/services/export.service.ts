import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { LanguageService } from './language.service';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(
    private languageService: LanguageService, 
    private notificationService: NotificationService
  ) {}

  exportToPDF(products: Product[], total: number): void {
    if (products.length === 0) {
      this.notificationService.notify('noProducts');
      return;
    }

    const lang = this.languageService.getCurrentLanguage();
    const t = this.languageService.getTranslations();

    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${t.shoppingList} - DevMarket</title>
        <style>
          @page { size: A4 portrait; margin: 0; }
          @media print {
            body { margin: 0; padding: 20px; }
            table { page-break-inside: avoid; }
          }
          body { font-family: Arial, sans-serif; padding: 20px; background: #ffffff; margin: 0; }
          h1 { color: #000000; text-align: center; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; border: 2px solid #000000; }
          th { background: #f0f0f0; color: #000000; padding: 12px; text-align: left; border: 1px solid #000000; }
          td { padding: 10px; border: 1px solid #ddd; color: #000000; }
          .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 20px; padding: 10px; border: 2px solid #000000; }
        </style>
      </head>
      <body>
        <h1>${t.shoppingList} - DevMarket</h1>
        <p><strong>${lang === 'pt' ? 'Data' : 'Date'}:</strong> ${new Date().toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US')}</p>
        <table>
          <thead>
            <tr>
              <th>${t.product}</th>
              <th>${t.category}</th>
              <th>${t.quantity}</th>
              <th>${t.price}</th>
              <th>${t.totalItem}</th>
            </tr>
          </thead>
          <tbody>
    `;

    products.forEach(product => {
      htmlContent += `
        <tr>
          <td>${this.escapeHtml(product.item)}</td>
          <td>${this.getCategoryIcon(product.categoria)} ${t[product.categoria] || product.categoria}</td>
          <td>${product.quantidade}</td>
          <td>${this.formatCurrency(product.preco || 0)}</td>
          <td>${this.formatCurrency(product.total || 0)}</td>
        </tr>
      `;
    });

    htmlContent += `
          </tbody>
        </table>
        <div class="total">${t.total}: ${this.formatCurrency(total)}</div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  }

  exportToCSV(products: Product[], total: number): void {
    if (products.length === 0) {
      this.notificationService.notify('noProducts');
      return;
    }

    const t = this.languageService.getTranslations();
    let csvContent = '\uFEFF';
    csvContent += `${t.product},${t.category},${t.quantity},${t.price},${t.totalItem}\n`;

    products.forEach(product => {
      const item = `"${product.item.replace(/"/g, '""')}"`;
      const categoria = `"${t[product.categoria] || product.categoria}"`;
      csvContent += `${item},${categoria},${product.quantidade},${product.preco || 0},${product.total || 0}\n`;
    });

    csvContent += `\n${t.total},,,,${total.toFixed(2)}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lista-compras-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  shareWhatsApp(): void {
    const shareUrl = this.generateShareLink();
    
    // Frase de convite usando as traduções
    const msgBase = this.languageService.translate('contactViaWhatsApp'); // Ou crie uma chave 'shareAppText'
    const mensagem = encodeURIComponent(
      `Acesse e faça sua lista de compras no DevMarket: ${shareUrl}`
    );

    window.open(`https://wa.me/?text=${mensagem}`, '_blank');
  }

  private generateShareLink(): string {
    return window.location.origin;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat(
      this.languageService.getCurrentLanguage() === 'pt' ? 'pt-BR' : 'en-US',
      {
        style: 'currency',
        currency: this.languageService.getCurrentLanguage() === 'pt' ? 'BRL' : 'USD'
      }
    ).format(value);
  }

  private getCategoryIcon(categoria: string): string {
    const icons: any = {
      'frutas': '🍎', 'verduras': '🥬', 'carnes': '🥩', 'laticinios': '🥛',
      'limpeza': '🧹', 'higiene': '🧴', 'bebidas': '🥤', 'padaria': '🍞', 'outros': '📦'
    };
    return icons[categoria] || '📦';
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}