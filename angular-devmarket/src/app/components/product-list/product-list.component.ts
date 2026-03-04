import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { HistoryService } from '../../services/history.service';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { ExportService } from '../../services/export.service';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(HistoryModalComponent) historyModal!: HistoryModalComponent;

  @Input() showOnlySidebar = false;
  @Input() showOnlyTable = false;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  total = 0;
  currentCategoryFilter = 'all';
  searchTerm = '';
  historyCount = 0;
  categoryModalOpen = false;
  sidebarOpen = false;
  donationModalOpen = false;
  quoteModalOpen = false;
  showToast: boolean = false;
  toastMessage: string = '';

  categories = [
    { value: 'todos', icon: 'bi bi-grid-3x3-gap', label: 'all' },
    { value: 'frutas', icon: '🍎', label: 'frutas' },
    { value: 'verduras', icon: '🥬', label: 'verduras' },
    { value: 'carnes', icon: '🥩', label: 'carnes' },
    { value: 'laticinios', icon: '🥛', label: 'laticinios' },
    { value: 'padaria', icon: '🍞', label: 'padaria' },
    { value: 'congelados', icon: '❄️', label: 'congelados' },
    { value: 'mercearia', icon: '🥫', label: 'mercearia' },
    { value: 'biscoitos', icon: '🍿', label: 'biscoitos' },
    { value: 'doces', icon: '🍫', label: 'doces' },
    { value: 'bebidas', icon: '🥤', label: 'bebidas' },
    { value: 'bebidas_alcoolicas', icon: '🍺', label: 'bebidasAlcoolicas' },
    { value: 'limpeza', icon: '🧹', label: 'limpeza' },
    { value: 'higiene', icon: '🧴', label: 'higiene' },
    { value: 'carro', icon: '🚗', label: 'carro' },
    { value: 'petshop', icon: '🐾', label: 'petshop' },
    { value: 'bebe', icon: '👶', label: 'bebe' },
    { value: 'saude', icon: '💊', label: 'saude' },
    { value: 'outros', icon: '📦', label: 'outros' }
  ];

  constructor(
    private productService: ProductService,
    private historyService: HistoryService,
    private exportService: ExportService,
    public themeService: ThemeService,
    public notificationService: NotificationService,
    public languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.updateFilteredProducts();
    });

    this.historyService.history$.subscribe(history => {
      this.historyCount = history.length;
    });

    window.addEventListener('toggle-sidebar', ((event: CustomEvent) => {
      if (event.detail && typeof event.detail.open === 'boolean') {
        this.sidebarOpen = event.detail.open;
      } else {
        this.sidebarOpen = !this.sidebarOpen;
      }
    }) as EventListener);
  }

  updateFilteredProducts(): void {
    this.filteredProducts = this.productService.getFilteredProducts();
    this.total = this.productService.getTotal();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.productService.setSearchTerm(term);
    this.updateFilteredProducts();
  }

  filterByCategory(category: string): void {
    this.currentCategoryFilter = category;
    this.productService.setCategoryFilter(category);
    this.updateFilteredProducts();
  }

  updateProduct(id: number, field: string, value: any): void {
    this.productService.updateProduct(id, { [field]: value });
    this.updateFilteredProducts();
  }

  removeProduct(id: number): void {
    this.productService.removeProduct(id);
    this.updateFilteredProducts();
  }

  saveList(): void {
    if (this.products.length === 0) {
      this.notificationService.notify('noProducts');
      return;
    }

    this.historyService.saveToHistory(this.products);
    this.productService.clearAll();
    this.updateFilteredProducts();
    this.closeSidebar();
  }

  async loadLastSavedList(): Promise<void> {
    const history = this.historyService.getHistory();
    if (history.length === 0) {
      this.notificationService.notify('noSavedList');
      return;
    }

    const lastSavedProducts = await this.historyService.restoreHistoryItem(history[0].id);
    
    if (!lastSavedProducts || lastSavedProducts.length === 0) {
      return;
    }

    this.productService.clearAll();
    
    lastSavedProducts.forEach((product: Product) => {
      product.id = Date.now() + Math.random();
      product.total = (product.quantidade || 0) * (product.preco || 0);
      this.productService.addProduct(product);
    });
    
    this.updateFilteredProducts();
    this.notificationService.notify('listLoaded');
  }

  exportPDF(): void {
    this.exportService.exportToPDF(this.filteredProducts, this.total);
    this.closeSidebar();
  }

  exportCSV(): void {
    this.exportService.exportToCSV(this.filteredProducts, this.total);
    this.closeSidebar();
  }

  shareWhatsApp(): void {
    this.exportService.shareWhatsApp();
    this.closeSidebar();
  }

  openHistory(): void {
    if (this.historyModal) {
      this.historyModal.open();
    }
    this.closeSidebar();
  }

  getCategoryIcon(categoria: string): string {
    if (categoria && categoria.toLowerCase() === 'padaria') {
      const category = this.categories.find(c => c.value === 'padaria');
      return category?.icon || 'bi-box';
    }
    const category = this.categories.find(c => c.value === categoria);
    return category?.icon || 'bi-box';
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

  openCategoryModal(): void {
    this.categoryModalOpen = true;
  }

  closeCategoryModal(): void {
    this.categoryModalOpen = false;
  }

  openDonationModal(): void {
    this.donationModalOpen = true;
    this.closeSidebar();
  }

  closeDonationModal(): void {
    this.donationModalOpen = false;
  }

  openQuoteModal(): void {
    this.quoteModalOpen = true;
    this.closeSidebar();
  }

  closeQuoteModal(): void {
    this.quoteModalOpen = false;
  }

  openWhatsAppQuote(): void {
    const phoneNumber = '5521979435455';
    const message = encodeURIComponent("Olá, gostaria de solicitar um orçamento para um projeto!");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

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

  getThemeTitle(): string {
    return this.themeService.getCurrentTheme() === 'light' 
      ? 'Tema Escuro' 
      : 'Tema Claro';
  }

  getThemeLabel(): string {
    return this.themeService.getCurrentTheme() === 'light' 
      ? 'Tema Escuro' 
      : 'Tema Claro';
  }

  showNotification(messageKey: string): void {
    this.toastMessage = this.languageService.translate(messageKey);
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  copyPixKey(key: string) {
    navigator.clipboard.writeText(key).then(() => {
      this.showNotification('pixCopied'); 
    }).catch(err => {
      console.error('Erro ao copiar chave:', err);
    });
  }
}