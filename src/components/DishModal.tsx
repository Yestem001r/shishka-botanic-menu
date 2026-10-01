import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import type { Dish } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import FadeImage from "./FadeImage";

export default function DishModal({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const { quantities, add, remove } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const qty = dish ? quantities[dish.id] ?? 0 : 0;
  const fav = dish ? isFavorite(dish.id) : false;

  useLayoutEffect(() => {
    if (dish) setExpanded(false);
  }, [dish]);

  useLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;
    // measured while collapsed (line-clamp-2 applied) — true overflow only
    setCanExpand(el.scrollHeight > el.clientHeight + 1);
  }, [dish, expanded]);

  return (
    <AnimatePresence>
      {dish && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/60"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[88%] flex-col overflow-hidden rounded-t-[18px] bg-surface"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 bg-surface-alt">
              <FadeImage
                src={dish.image}
                alt={dish.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-90 transition-transform duration-200"
              >
                <X size={18} />
              </button>
              <button
                onClick={() => toggle(dish.id)}
                className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm active:scale-90 transition-transform duration-200"
              >
                <Heart
                  size={17}
                  strokeWidth={2}
                  className={fav ? "fill-forest-400 text-forest-400" : "text-white"}
                />
              </button>
              {dish.tag && (
                <span
                  className={`absolute bottom-3 left-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                    dish.tag === "hit" ? "bg-gold-500" : "bg-forest-600"
                  }`}
                >
                  {dish.tag === "hit" ? "Хит продаж" : "Новое"}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-4 pt-4">
              <span className="text-[14px] font-medium text-ink-700">
                {formatPrice(dish.price)}
              </span>
              <h2 className="mt-1 text-[20px] font-medium leading-tight text-ink-900">
                {dish.name}
              </h2>
              <p
                ref={descRef}
                className={`mt-2 text-[16px] leading-[1.6] text-ink-700 ${
                  expanded ? "" : "line-clamp-2"
                }`}
              >
                {dish.description}
              </p>
              {canExpand && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-1.5 self-start text-[14px] font-medium text-ink-500"
                >
                  {expanded ? "скрыть" : "показать всё"}
                </button>
              )}

              <div className="mt-5 flex-1" />

              {qty === 0 ? (
                <button
                  onClick={() => add(dish.id)}
                  className="mt-5 flex w-full items-center justify-between rounded-xl bg-forest-600 py-2 pl-5 pr-2 text-white active:scale-[0.98] transition-transform"
                >
                  <span className="text-[15px] font-semibold">Добавить в заказ</span>
                  <span className="rounded-lg bg-white/15 px-4 py-3 text-[14px] font-bold">
                    {formatPrice(dish.price)}
                  </span>
                </button>
              ) : (
                <div className="mt-5 flex w-full items-center justify-between rounded-xl bg-forest-600 py-2 pl-5 pr-2 text-white">
                  <span className="text-[15px] font-semibold">
                    {formatPrice(dish.price * qty)}
                  </span>
                  <span className="flex items-center gap-2 rounded-lg bg-white/15 px-1.5 py-1.5">
                    <button
                      onClick={() => remove(dish.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-white/15 active:scale-90 transition-transform duration-200"
                    >
                      <Minus size={15} strokeWidth={2.5} />
                    </button>
                    <span className="min-w-[18px] text-center text-[15px] font-bold tabular-nums">
                      {qty}
                    </span>
                    <button
                      onClick={() => add(dish.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-white/15 active:scale-90 transition-transform duration-200"
                    >
                      <Plus size={15} strokeWidth={2.5} />
                    </button>
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
