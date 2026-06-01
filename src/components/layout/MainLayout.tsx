import { Outlet, useLocation } from 'react-router-dom';
import { CartDrawer } from '../CartDrawer';
import { useFilter } from '../../context/FilterContext';
import { Footer } from './Footer';
import { Header } from './Header';

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useFilter();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={isHome ? setActiveCategory : undefined}
        searchQuery={searchQuery}
        onSearchChange={isHome ? setSearchQuery : undefined}
        showCategoryNav={isHome}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
