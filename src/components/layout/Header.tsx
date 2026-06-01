import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import { company, formatCurrency } from '@config/company';
import { useCart } from '../../context/CartContext';
import type { ProductCategory } from '../../types/product';
import { CATEGORY_LABELS } from '../../types/product';

const NAV_CATEGORIES: ProductCategory[] = [
  'proteinas',
  'creatina',
  'aminoacidos',
  'pre-treinos',
  'vitaminas',
  'vegano',
];

type HeaderProps = {
  activeCategory?: ProductCategory | 'all';
  onCategoryChange?: (category: ProductCategory | 'all') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showCategoryNav?: boolean;
};

export function Header({
  activeCategory = 'all',
  onCategoryChange,
  searchQuery = '',
  onSearchChange,
  showCategoryNav = true,
}: HeaderProps) {
  const { itemCount, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const freeShipping = formatCurrency(company.freeShippingThreshold);

  const handleCategoryClick = (cat: ProductCategory | 'all') => {
    onCategoryChange?.(cat);
    setMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-accent-orange py-1.5 text-center text-xs font-semibold text-white sm:text-sm">
        Frete Grátis em compras acima de {freeShipping} · Parcele em até 6x sem
        juros
      </div>

      <div className="bg-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:py-4">
          <button
            type="button"
            className="rounded p-2 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <Link to="/" className="shrink-0 text-xl font-black tracking-tight sm:text-2xl">
            <span className="text-white">{company.name.split(' ')[0]}</span>
            <span className="text-accent-orange">Fit</span>
          </Link>

          <div className="hidden flex-1 lg:block">
            <label className="relative mx-auto block max-w-2xl">
              <span className="sr-only">Buscar produtos</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Buscar whey, creatina, pré-treino..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                disabled={!onSearchChange}
                className="w-full rounded-full border-0 bg-white py-3 pl-12 pr-4 text-sm text-navy shadow-inner placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-orange disabled:opacity-70"
              />
            </label>
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              to="/quem-somos"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10 sm:flex"
            >
              <User className="h-5 w-5" aria-hidden />
              <span className="hidden md:inline">Minha Conta</span>
            </Link>
            <button
              type="button"
              onClick={openDrawer}
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10"
              aria-label={`Carrinho com ${itemCount} itens`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              <span className="hidden md:inline">Carrinho</span>
              {itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-orange px-1 text-xs font-bold">
                  {itemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {onSearchChange ? (
          <div className="border-t border-white/10 px-4 pb-3 lg:hidden">
            <label className="relative block">
              <span className="sr-only">Buscar produtos</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Buscar suplementos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-sm text-navy"
              />
            </label>
          </div>
        ) : null}

        {showCategoryNav && onCategoryChange ? (
          <nav
            className={`border-t border-white/10 bg-navy ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}
            aria-label="Categorias de produtos"
          >
            <ul className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:justify-center lg:gap-1 lg:px-4">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('all')}
                  className={`block w-full px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide transition-colors lg:px-5 lg:py-3 lg:text-center ${
                    activeCategory === 'all'
                      ? 'bg-accent-orange text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  Todos
                </button>
              </li>
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className={`block w-full px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide transition-colors lg:px-5 lg:py-3 lg:text-center ${
                      activeCategory === cat
                        ? 'bg-accent-orange text-white'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
