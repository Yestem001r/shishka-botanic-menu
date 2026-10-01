import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Heart, Search, X } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function Header({
  query,
  onQueryChange,
  onCallWaiter,
  favoritesOnly,
  onToggleFavoritesOnly,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  onCallWaiter: () => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useFavorites();

  return (
    <div className="flex items-center gap-2 bg-bg/95 px-4 pb-1 pt-4 backdrop-blur-sm">
      <AnimatePresence mode="wait" initial={false}>
        {searchOpen ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex flex-1 items-center gap-2 rounded-lg bg-surface px-4 py-2.5"
          >
            <Search size={16} className="text-ink-500" />
            <input
              autoFocus
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Найти блюдо..."
              className="flex-1 bg-transparent text-[14px] text-ink-900 outline-none placeholder:text-ink-500"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                onQueryChange("");
              }}
            >
              <X size={16} className="text-ink-500" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 items-center justify-between"
          >
            <p className="text-[18px] font-bold leading-none text-ink-900">
              Shishka Botanic
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink-900 active:scale-90 transition-transform duration-200"
              >
                <Search size={18} />
              </button>
              <button
                onClick={onToggleFavoritesOnly}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full active:scale-90 transition-transform duration-200 ${
                  favoritesOnly ? "bg-forest-600 text-white" : "bg-surface text-ink-900"
                }`}
              >
                <Heart
                  size={18}
                  className={favoritesOnly ? "fill-white" : ""}
                  strokeWidth={2}
                />
                {count > 0 && !favoritesOnly && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest-500 text-[9px] font-bold text-white">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={onCallWaiter}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink-900 active:scale-90 transition-transform duration-200"
              >
                <BellRing size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
