import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FilterProvider } from './context/FilterContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/institutional/AboutUsPage';
import { PrivacyPolicyPage } from './pages/institutional/PrivacyPolicyPage';
import { ReturnsPolicyPage } from './pages/institutional/ReturnsPolicyPage';
import { ShippingPolicyPage } from './pages/institutional/ShippingPolicyPage';
import { TermsOfUsePage } from './pages/institutional/TermsOfUsePage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FilterProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="quem-somos" element={<AboutUsPage />} />
              <Route
                path="politica-de-privacidade"
                element={<PrivacyPolicyPage />}
              />
              <Route path="termos-de-uso" element={<TermsOfUsePage />} />
              <Route path="trocas-e-devolucoes" element={<ReturnsPolicyPage />} />
              <Route path="frete-e-entregas" element={<ShippingPolicyPage />} />
            </Route>
          </Routes>
        </FilterProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
