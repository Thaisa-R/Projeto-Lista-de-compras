import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { ExportService } from '../../services/export.service';
import { HistoryItem } from '../../models/product.interface';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css']
})
export class HistoryModalComponent implements OnInit {
  isOpen = false;
  activeTab: 'list' | 'stats' = 'list';
  history: HistoryItem[] = [];
  statistics: any = {};
  selectedItems: number[] = [];
  selectedHistory: any = null;

  constructor(
    private historyService: HistoryService,
    private productService: ProductService,
    private exportService: ExportService,
    public languageService: LanguageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.historyService.history$.subscribe(history => {
      this.history = history;
      this.statistics = this.historyService.getStatistics();
    });
  }

  open(): void { this.isOpen = true; }
  close(): void { this.isOpen = false; }

  viewDetails(item: any) {
    this.selectedHistory = item;
  }

  closeDetails() {
    this.selectedHistory = null;
  }


  getItemDetails(p: any) {
    return {
      name: p.item || p.name || p.nome || p.product_name || 'Produto',
      price: p.preco || p.price || 0,
      quantity: p.quantidade || p.quantity || 1
    };
  }

  shareToWhatsApp(item: any) {
    const data = this.formatDate(item.data);
    let cupom = "```" + `*–––––––––––––––––––––––––––* \n`;
    cupom += `      🛒 *DEVMARKET* \n`;
    cupom += `   *LISTA COMPARTILHADA* \n`;
    cupom += `*–––––––––––––––––––––––––––* \n`;
    cupom += `🗓️ ${data}\n`;
    cupom += `*––––––––––––––––––––––––––* \n\n`;
    
    item.produtos.forEach((p: any) => {
      const detalhes = this.getItemDetails(p);
      const precoFormatado = this.formatCurrency(detalhes.price * detalhes.quantity);
      cupom += `📌 ${detalhes.quantity}x ${detalhes.name}\n`;
      cupom += `   Subtotal: ${precoFormatado}\n\n`;
    });
    
    cupom += `*–––––––––––––––––––––––––––* \n`;
    cupom += `💰 *TOTAL: ${this.formatCurrency(item.total)}* \n`;
    cupom += `*–––––––––––––––––––––––––––* \n` + "```";

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(cupom)}`;
    window.open(url, '_blank');
  }

  switchTab(tab: 'list' | 'stats'): void {
    this.activeTab = tab;
    if (tab === 'stats') {
      this.statistics = this.historyService.getStatistics();
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat(
      this.languageService.getCurrentLanguage() === 'pt' ? 'pt-BR' : 'en-US',
      {
        style: 'currency',
        currency: this.languageService.getCurrentLanguage() === 'pt' ? 'BRL' : 'USD'
      }
    ).format(value);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      this.languageService.getCurrentLanguage() === 'pt' ? 'pt-BR' : 'en-US',
      { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    );
  }

  async deleteItem(id: number): Promise<void> {

    await this.historyService.deleteHistoryItem(id);
    
    this.selectedItems = this.selectedItems.filter(itemId => itemId !== id);
  }


  toggleSelection(id: number): void {
    const index = this.selectedItems.indexOf(id);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedItems.includes(id);
  }

  printHistory(): void {
    if (this.history.length === 0) return;

    if (this.history.length === 1) {
      const item = this.history[0];
      this.exportService.exportToPDF(item.produtos, item.total);
      return;
    }

    if (this.selectedItems.length === 0) {
      this.notificationService.notify('selectListToPrint');
      return;
    }

    const selectedHistory = this.history.filter(item => this.selectedItems.includes(item.id));
    this.exportService.exportToPDF(
      selectedHistory.flatMap(item => item.produtos),
      selectedHistory.reduce((sum, item) => sum + item.total, 0)
    );

    
  }

  downloadHistory(): void {
    if (this.history.length === 0) return;


    if (this.selectedItems.length === 0) {
      this.exportService.exportToPDF(
        this.history.flatMap(item => item.produtos),
        this.history.reduce((sum, item) => sum + item.total, 0)
      );
    } else {

      const selectedHistory = this.history.filter(item => this.selectedItems.includes(item.id));
      this.exportService.exportToPDF(
        selectedHistory.flatMap(item => item.produtos),
        selectedHistory.reduce((sum, item) => sum + item.total, 0)
      );
    }
    
    this.notificationService.notify('Download iniciado!');
  }


  reutilizarLista(itemHistorico: any) {

    this.productService.recarregarListaParaEdicao(itemHistorico.produtos);
    
    this.close(); 
    
    this.notificationService.notify('Lista carregada para edição!');
  }
}
