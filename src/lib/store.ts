import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: Product[];
  addItem: (product: any) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, getState) => ({
      items: [],
      addItem: (product) => {
        const currentItems = getState().items;
        const existing = currentItems.find((i) => i.slug === product.slug);
        if (existing) {
          set({
            items: currentItems.map((i) =>
              i.slug === product.slug ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (slug) => set({ items: getState().items.filter((i) => i.slug !== slug) }),
      updateQuantity: (slug, qty) => {
        if (qty <= 0) {
          set({ items: getState().items.filter((i) => i.slug !== slug) });
        } else {
          set({
            items: getState().items.map((i) =>
              i.slug === slug ? { ...i, quantity: qty } : i
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => getState().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'dyoung-cart-storage' }
  )
);
