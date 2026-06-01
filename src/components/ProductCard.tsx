import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@config/company';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';
import { ProductImage } from './ProductImage';

type ProductCardProps = {
  product: Product;
};

const badgeStyles: Record<NonNullable<Product['badge']>, string> = {
  'Mais Vendido': 'bg-navy text-white',
  Lançamento: 'bg-accent-orange text-white',
  Oferta: 'bg-emerald-600 text-white',
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const discountPercent = Math.round(
    ((product.originalPrice - product.pixPrice) / product.originalPrice) * 100,
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square bg-surface p-4">
        {product.badge ? (
          <span
            className={`absolute left-3 top-3 z-10 rounded px-2 py-1 text-xs font-bold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        ) : null}
        <ProductImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <h3 className="mb-3 line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-navy sm:text-base">
          {product.name}
        </h3>

        <div className="mb-1 text-sm text-gray-400 line-through">
          De {formatCurrency(product.originalPrice)}
        </div>
        <div className="mb-1 text-lg font-bold text-navy">
          {formatCurrency(product.price)}
        </div>
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-accent-orange">
            {formatCurrency(product.pixPrice)}
          </span>
          <span className="text-xs font-medium text-gray-500">no PIX</span>
          {discountPercent > 0 ? (
            <span className="ml-auto rounded bg-accent-orange/10 px-1.5 py-0.5 text-xs font-bold text-accent-orange">
              -{discountPercent}%
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-accent-orange py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-orange-hover active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden />
          Comprar
        </button>
      </div>
    </article>
  );
}
