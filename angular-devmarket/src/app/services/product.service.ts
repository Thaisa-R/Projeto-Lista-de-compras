import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  private currentCategoryFilter = 'all';
  private currentSearchTerm = '';

  constructor(private storage: StorageService) {
    this.loadProducts();
  }

  getProducts(): Product[] {
    return this.productsSubject.value;
  }

  getFilteredProducts(): Product[] {
    let filtered = [...this.productsSubject.value];

    if (this.currentCategoryFilter !== 'all') {
      filtered = filtered.filter(p => p.categoria === this.currentCategoryFilter);
    }

    if (this.currentSearchTerm.trim() !== '') {
      filtered = filtered.filter(p =>
        p.item.toLowerCase().includes(this.currentSearchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  addProduct(product: Product): boolean {
    const products = this.productsSubject.value;
    
    if (products.some(p => p.item.toLowerCase() === product.item.toLowerCase())) {
      return false;
    }

    product.id = Date.now();
    product.total = product.quantidade * product.preco;
    
    const newProducts = [...products, product];
    this.productsSubject.next(newProducts);
    this.saveProducts();
    return true;
  }

  updateProduct(id: number, updates: Partial<Product>): void {
    const products = this.productsSubject.value.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates };
        updated.total = updated.quantidade * updated.preco;
        return updated;
      }
      return p;
    });
    this.productsSubject.next(products);
    this.saveProducts();
  }

  removeProduct(id: number): void {
    const products = this.productsSubject.value.filter(p => p.id !== id);
    this.productsSubject.next(products);
    this.saveProducts();
  }

  clearAll(): void {
    this.productsSubject.next([]);
    this.saveProducts();
  }

  setCategoryFilter(category: string): void {
    this.currentCategoryFilter = category;
  }

  getCategoryFilter(): string {
    return this.currentCategoryFilter;
  }

  setSearchTerm(term: string): void {
    this.currentSearchTerm = term;
  }

  getSearchTerm(): string {
    return this.currentSearchTerm;
  }

  getTotal(): number {
    return this.getFilteredProducts().reduce((sum, p) => sum + (p.total || 0), 0);
  }

  private loadProducts(): void {
    const saved = this.storage.get<Product[]>('produtos');
    if (saved) {
      this.productsSubject.next(saved);
    }
  }

  private saveProducts(): void {
    this.storage.save('produtos', this.productsSubject.value);
  }

  recarregarListaParaEdicao(produtosAntigos: any[]) {
    const novosProdutos: Product[] = produtosAntigos.map(p => ({
      id: Date.now() + Math.random(),
      item: p.item || p.nome || p.name || 'Produto',
      quantidade: p.quantidade || 1,
      preco: p.preco || 0,
      categoria: p.categoria || 'Outros',
      comprado: false,
      total: (p.quantidade || 1) * (p.preco || 0)
    }));

    this.productsSubject.next(novosProdutos);
    this.saveProducts();
  }
}