import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { formatCurrency } from '@config/company';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    itemCount,
    subtotal,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
      >
        <header className="flex items-center justify-between border-b border-gray-100 bg-navy px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-bold">
              Carrinho ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded p-1 hover:bg-white/10 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              Seu carrinho está vazio. Adicione suplementos para começar!
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-lg border border-gray-100 p-3"
                >
                  <div className="h-20 w-20 shrink-0 rounded bg-surface p-1">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-sm font-medium text-navy">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-accent-orange">
                      {formatCurrency(product.pixPrice)} no PIX
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="p-1.5 hover:bg-gray-50"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="p-1.5 hover:bg-gray-50"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="border-t border-gray-100 p-5">
            <div className="mb-4 flex justify-between text-lg">
              <span className="font-medium text-gray-600">Subtotal</span>
              <span className="font-bold text-navy">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-accent-orange py-3.5 font-bold uppercase tracking-wide text-white hover:bg-accent-orange-hover transition-colors"
            >
              Finalizar compra
            </button>
          </footer>
        ) : null}
      </aside>
    </>
  );
}
