import { Component, ViewChild } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { ScannerModalComponent } from '../scanner-modal/scanner-modal.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @ViewChild(ScannerModalComponent) scannerModal!: ScannerModalComponent;

  product: Partial<Product> = {
    item: '',
    categoria: '',
    quantidade: 1,
    preco: 0
  };

  categories = [
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
    public languageService: LanguageService,
    private notificationService: NotificationService,
  ) {}

  addProduct(): void {
    if (!this.product.item || !this.product.item.trim()) {
      this.notificationService.notify('invalidItem');
      return;
    }

    const success = this.productService.addProduct({
      item: this.product.item.trim(),
      categoria: this.product.categoria || 'outros',
      quantidade: this.product.quantidade || 1,
      preco: this.product.preco || 0,
      total: 0
    });

    if (!success) {
      this.notificationService.notify('itemExists');
      return;
    }

    this.clearFields();
  }

  clearAll(): void {
    this.productService.clearAll();
    this.notificationService.notify('listCleared'); 
  }

  openScanner(): void {
    if (this.scannerModal) {
      this.scannerModal.open();
    }
  }

  private clearFields(): void {
    this.product = {
      item: '',
      categoria: '',
      quantidade: 1,
      preco: 0
    };
  }
}