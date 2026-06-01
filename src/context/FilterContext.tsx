import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ProductCategory } from '../types/product';

type FilterContextValue = {
  activeCategory: ProductCategory | 'all';
  setActiveCategory: (category: ProductCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(
    'all',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const value = useMemo(
    () => ({
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
    }),
    [activeCategory, searchQuery],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error('useFilter deve ser usado dentro de FilterProvider');
  }
  return ctx;
}
