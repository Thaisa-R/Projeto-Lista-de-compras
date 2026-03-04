export interface Product {
  id?: number;
  item: string;
  categoria: string;
  quantidade: number;
  preco: number;
  total: number;
}

export interface HistoryItem {
  id: number;
  data: string;
  produtos: Product[];
  total: number;
  quantidadeItens: number;
}