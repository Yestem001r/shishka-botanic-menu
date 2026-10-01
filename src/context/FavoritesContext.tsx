import { createContext, useContext, useState, type ReactNode } from "react";

interface FavoritesContextValue {
  favorites: Set<string>;
  toggle: (dishId: string) => void;
  isFavorite: (dishId: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggle = (dishId: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(dishId)) next.delete(dishId);
      else next.add(dishId);
      return next;
    });

  const isFavorite = (dishId: string) => favorites.has(dishId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggle, isFavorite, count: favorites.size }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
