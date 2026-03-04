import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoryItem, Product } from '../models/product.interface';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historySubject = new BehaviorSubject<HistoryItem[]>([]);
  public history$: Observable<HistoryItem[]> = this.historySubject.asObservable();

  constructor(
    private storage: StorageService,
    private notification: NotificationService 
  ) {
    this.loadHistory();
  }

  getHistory(): HistoryItem[] {
    return this.historySubject.value;
  }

  saveToHistory(products: Product[]): void {
    if (products.length === 0) return;

    const historyItem: HistoryItem = {
      id: Date.now(),
      data: new Date().toISOString(),
      produtos: JSON.parse(JSON.stringify(products)),
      total: products.reduce((sum, p) => sum + (p.total || 0), 0),
      quantidadeItens: products.length
    };

    const history = [historyItem, ...this.historySubject.value];
    if (history.length > 50) history.splice(50);

    this.historySubject.next(history);
    this.saveHistory();
    this.notification.notify('listSaved');
  }

  async deleteHistoryItem(id: number): Promise<void> {
    const confirmed = await this.notification.confirm('deleteHistoryConfirm');
    
    if (confirmed) {
      const history = this.historySubject.value.filter(h => h.id !== id);
      this.historySubject.next(history);
      this.saveHistory();
      this.notification.notify('historyDeleted');
    }
  }

  async restoreHistoryItem(id: number): Promise<Product[]> {
    const item = this.historySubject.value.find(h => h.id === id);
    if (item) {
      const confirmed = await this.notification.confirm('replaceList');
      if (confirmed) {
        this.notification.notify('listRestored');
        return JSON.parse(JSON.stringify(item.produtos));
      }
    }
    return []; 
  }

  getStatistics(): any {
    const history = this.historySubject.value;
    if (history.length === 0) return { totalSpent: 0, totalLists: 0, totalItems: 0, avgSpent: 0 };

    const totalSpent = history.reduce((sum, h) => sum + h.total, 0);
    const totalItems = history.reduce((sum, h) => sum + h.quantidadeItens, 0);
    const avgSpent = totalSpent / history.length;

    return { totalSpent, totalLists: history.length, totalItems, avgSpent };
  }

  getMostBoughtProducts(): any[] {
    const history = this.historySubject.value;
    const productsCount: any = {};

    history.forEach(item => {
      item.produtos.forEach(produto => {
        const key = produto.item.toLowerCase();
        if (!productsCount[key]) {
          productsCount[key] = { nome: produto.item, quantidade: 0 };
        }
        productsCount[key].quantidade += produto.quantidade;
      });
    });

    return Object.values(productsCount)
      .sort((a: any, b: any) => b.quantidade - a.quantidade)
      .slice(0, 10);
  }

  private loadHistory(): void {
    const saved = this.storage.get<HistoryItem[]>('historico');
    if (saved) this.historySubject.next(saved);
  }

  private saveHistory(): void {
    this.storage.save('historico', this.historySubject.value);
  }
}