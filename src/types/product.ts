export type ProductCategory =
  | 'proteinas'
  | 'creatina'
  | 'aminoacidos'
  | 'pre-treinos'
  | 'vitaminas'
  | 'vegano';

export type ProductBadge = 'Mais Vendido' | 'Lançamento' | 'Oferta' | null;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  originalPrice: number;
  price: number;
  pixPrice: number;
  badge: ProductBadge;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  proteinas: 'Proteínas',
  creatina: 'Creatina',
  aminoacidos: 'Aminoácidos',
  'pre-treinos': 'Pré-Treinos',
  vitaminas: 'Vitaminas',
  vegano: 'Vegano',
};
