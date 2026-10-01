import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { dishes, type Dish } from "../data/menu";

interface CartContextValue {
  quantities: Record<string, number>;
  add: (dishId: string) => void;
  remove: (dishId: string) => void;
  setQty: (dishId: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  items: { dish: Dish; qty: number }[];
}

const CartContext = createContext<CartContextValue | null>(null);

const dishById = new Map(dishes.map((d) => [d.id, d]));

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const add = (dishId: string) =>
    setQuantities((q) => ({ ...q, [dishId]: (q[dishId] ?? 0) + 1 }));

  const remove = (dishId: string) =>
    setQuantities((q) => {
      const next = { ...q };
      const current = next[dishId] ?? 0;
      if (current <= 1) {
        delete next[dishId];
      } else {
        next[dishId] = current - 1;
      }
      return next;
    });

  const setQty = (dishId: string, qty: number) =>
    setQuantities((q) => {
      const next = { ...q };
      if (qty <= 0) {
        delete next[dishId];
      } else {
        next[dishId] = qty;
      }
      return next;
    });

  const clear = () => setQuantities({});

  const items = useMemo(
    () =>
      Object.entries(quantities)
        .map(([id, qty]) => ({ dish: dishById.get(id)!, qty }))
        .filter((i) => i.dish),
    [quantities],
  );

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.dish.price, 0);

  return (
    <CartContext.Provider
      value={{ quantities, add, remove, setQty, clear, count, total, items }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
