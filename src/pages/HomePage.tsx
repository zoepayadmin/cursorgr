import { useMemo } from 'react';
import { Zap } from 'lucide-react';
import { company, formatCurrency } from '@config/company';
import productsData from '../data/products.json';
import { ProductCard } from '../components/ProductCard';
import { useFilter } from '../context/FilterContext';
import type { Product } from '../types/product';
import { CATEGORY_LABELS } from '../types/product';

const products = productsData as Product[];

export function HomePage() {
  const { activeCategory, searchQuery } = useFilter();

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        CATEGORY_LABELS[p.category].toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 sm:px-6 md:flex-row md:py-16 lg:py-20">
          <div className="flex-1 text-center md:text-left">
            <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-accent-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-orange">
              <Zap className="h-3.5 w-3.5" aria-hidden />
              Ofertas da semana
            </span>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Suplementos de alta performance com o melhor preço no PIX
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              {company.name}: whey, creatina, pré-treinos e muito mais. Frete
              grátis acima de{' '}
              {formatCurrency(company.freeShippingThreshold)}.
            </p>
            <a
              href="#produtos"
              className="mt-6 inline-block rounded-lg bg-accent-orange px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent-orange-hover transition-colors"
            >
              Ver ofertas
            </a>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl bg-white/10 p-3 text-center backdrop-blur"
                >
                  <p className="text-2xl font-black text-accent-orange">
                    {formatCurrency(p.pixPrice)}
                  </p>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2">
                    {p.name.split('—')[0].trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {activeCategory === 'all'
                ? 'Destaques da loja'
                : CATEGORY_LABELS[activeCategory]}
            </h2>
            <p className="mt-1 text-gray-500">
              {filtered.length} produto{filtered.length !== 1 ? 's' : ''}{' '}
              encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center text-gray-500">
            Nenhum produto encontrado. Tente outra busca ou categoria.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
