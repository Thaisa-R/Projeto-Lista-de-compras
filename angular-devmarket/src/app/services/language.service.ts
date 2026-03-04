import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<'pt' | 'en'>('pt');
  public language$: Observable<'pt' | 'en'> = this.currentLanguage.asObservable();

  private translations: any = {
    pt: {
      appTitle: 'DevMarket',
      shoppingList: 'Lista de Compras',
      scanCode: 'Escanear Código',
      or: 'ou',
      addManually: 'Adicione manualmente',
      item: 'Item',
      quantity: 'Quantidade',
      price: 'Preço',
      totalItem: 'Total Item',
      remove: 'Remover',
      actions: 'Ações',
      product: 'Produto',
      total: 'Total',
      add: 'Adicionar',
      clear: 'Limpar',
      startScan: 'Iniciar Scanner',
      stopScan: 'Parar Scanner',
      scanTitle: 'Escanear Código de Barras / QR Code',
      loading: 'Carregando...',
      searchingProduct: 'Buscando produto...',
      productNotFound: 'Produto não encontrado',
      invalidItem: 'Por favor: Insira um item válido.',
      itemExists: 'Este item já consta em sua lista.',
      category: 'Categoria',
      searchPlaceholder: 'Buscar produto...',
      itemPlaceholder: 'Produto',
      quantityPlaceholder: 'Quantidade',
      pricePlaceholder: 'Preço',
      frutas: 'Frutas',
      verduras: 'Verduras',
      carnes: 'Carnes',
      laticinios: 'Laticínios',
      limpeza: 'Limpeza',
      higiene: 'Higiene',
      bebidas: 'Bebidas',
      padaria: 'Padaria',
      outros: 'Outros',
      congelados: 'Congelados',
      mercearia: 'Mercearia',
      biscoitos: 'Biscoitos & Bolachas',
      doces: 'Doces & Chocolates',
      bebidasAlcoolicas: 'Bebidas Alcoólicas',
      carro: 'Automotivo / Carro',
      petshop: 'Pet Shop',
      bebe: 'Bebê',
      saude: 'Saúde & Farmácia',
      historyTitle: 'Histórico de Compras',
      saveList: 'Salvar Lista',
      viewSavedList: 'Ver Lista Salva',
      history: 'Histórico',
      exportPDF: 'Exportar PDF',
      exportCSV: 'Exportar CSV',
      share: 'Compartilhar Link',
      donate: 'Doe',
      quote: 'Solicite Orçamento para site ou outros serviços',
      all: 'Todos',
      noProducts: 'Não há produtos para exportar.',
      listSaved: 'Lista salva no histórico e limpa com sucesso!',
      noSavedList: 'Não há lista salva para carregar.',
      listLoaded: 'Lista salva carregada com sucesso!',
      scanError: 'Erro ao iniciar scanner',
      list: 'Lista',
      statistics: 'Estatísticas',
      print: 'Imprimir',
      totalSpent: 'Total Gasto',
      listsCompleted: 'Listas Realizadas',
      itemsBought: 'Itens Comprados',
      avgPerList: 'Média por Lista',
      noHistory: 'Nenhum histórico disponível',
      replaceList: 'Isso substituirá sua lista atual. Deseja continuar?',
      deleteHistoryConfirm: 'Deseja realmente deletar este item do histórico?',
      noProductsMessage: 'Você ainda não adicionou um produto a sua lista',
      devName: 'Desenvolvedora Thaísa Raquel',
      qrCodeSoon: 'QR Code em breve',
      pixCopied: 'Chave Pix copiada com sucesso!',
      selectListToPrint: 'Por favor, selecione uma lista para imprimir.',
      requestQuote: 'Solicite Orçamento',
      contactViaWhatsApp: 'Entrar em contato via WhatsApp',
      historyDeleted: 'Item removido do histórico!',
      listRestored: 'Lista restaurada com sucesso!',
      listCleared: 'A lista foi limpa com sucesso!',
      nubankAccount: "Conta Nubank",
      pixPhone: "Pix: Celular",
      copyPix: "Copiar chave Pix",
      scanToDonate: "Escaneie para doar"
    },
    en: {
      appTitle: 'DevMarket',
      shoppingList: 'Shopping List',
      scanCode: 'Scan Code',
      or: 'or',
      addManually: 'Add manually',
      item: 'Item',
      quantity: 'Quantity',
      price: 'Price',
      totalItem: 'Item Total',
      remove: 'Remove',
      actions: 'Actions',
      product: 'Product',
      total: 'Total',
      add: 'Add',
      clear: 'Clear',
      startScan: 'Start Scanner',
      stopScan: 'Stop Scanner',
      scanTitle: 'Scan Barcode / QR Code',
      loading: 'Loading...',
      searchingProduct: 'Searching product...',
      productNotFound: 'Product not found',
      invalidItem: 'Please: Enter a valid item.',
      itemExists: 'This item is already in your list.',
      category: 'Category',
      searchPlaceholder: 'Search product...',
      itemPlaceholder: 'Product',
      quantityPlaceholder: 'Quantity',
      pricePlaceholder: 'Price',
      frutas: 'Fruits',
      verduras: 'Vegetables',
      carnes: 'Meats',
      laticinios: 'Dairy',
      limpeza: 'Cleaning',
      higiene: 'Hygiene',
      bebidas: 'Drinks',
      padaria: 'Bakery',
      outros: 'Others',
      congelados: 'Frozen Food',
      mercearia: 'Grocery',
      biscoitos: 'Cookies & Crackers',
      doces: 'Sweets & Candy',
      bebidasAlcoolicas: 'Alcoholic Drinks',
      carro: 'Automotive',
      petshop: 'Pet Shop',
      bebe: 'Baby Care',
      saude: 'Health & Pharmacy',
      historyTitle: 'Shopping History',
      saveList: 'Save List',
      viewSavedList: 'View Saved List',
      history: 'History',
      exportPDF: 'Export PDF',
      exportCSV: 'Export CSV',
      share: 'Share',
      donate: 'Donate',
      quote: 'Request a quote for website or other services',
      all: 'All',
      noProducts: 'No products to export.',
      listSaved: 'List saved to history and cleared successfully!',
      noSavedList: 'No saved list to load.',
      listLoaded: 'Saved list loaded successfully!',
      scanError: 'Error starting scanner',
      list: 'List',
      statistics: 'Statistics',
      print: 'Print',
      totalSpent: 'Total Spent',
      listsCompleted: 'Lists Completed',
      itemsBought: 'Items Bought',
      avgPerList: 'Average Per List',
      noHistory: 'No history available',
      replaceList: 'This will replace your current list. Do you want to continue?',
      deleteHistoryConfirm: 'Do you really want to delete this item from history?',
      noProductsMessage: 'You have not added any products to your list yet',
      devName: 'Developer Thaísa Raquel',
      qrCodeSoon: 'QR Code coming soon',
      pixCopied: 'Pix key copied successfully!',
      selectListToPrint: 'Please select a list to print.',
      requestQuote: 'Request a Quote',
      contactViaWhatsApp: 'Contact via WhatsApp',
      historyDeleted: 'History item deleted!',
      listRestored: 'List restored successfully!',
      listCleared: 'The list has been successfully cleared!',
      nubankAccount: "Nubank Account",
      pixPhone: "Pix: Phone Number",
      copyPix: "Copy Pix Key",
      scanToDonate: "Scan to donate"
    }
  };

  constructor() {}

  initLanguage(): void {
    const savedLanguage = (localStorage.getItem('language') as 'pt' | 'en') || 'pt';
    this.setLanguage(savedLanguage);
  }

  getCurrentLanguage(): 'pt' | 'en' {
    return this.currentLanguage.value;
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage.value === 'pt' ? 'en' : 'pt';
    this.setLanguage(newLang);
  }

  setLanguage(lang: 'pt' | 'en'): void {
    this.currentLanguage.next(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  translate(key: string): string {
    const lang = this.currentLanguage.value;
    return this.translations[lang]?.[key] || key;
  }

  getTranslations(): any {
    return this.translations[this.currentLanguage.value];
  }
}