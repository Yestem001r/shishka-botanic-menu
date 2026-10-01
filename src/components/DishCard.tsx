import { Heart, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Dish } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import FadeImage from "./FadeImage";

export default function DishCard({
  dish,
  onOpen,
}: {
  dish: Dish;
  onOpen: (dish: Dish) => void;
}) {
  const { quantities, add, remove } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const qty = quantities[dish.id] ?? 0;
  const fav = isFavorite(dish.id);

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onOpen(dish)}
      className="flex w-full items-start gap-3 border-b border-line py-4 text-left last:border-b-0"
    >
      <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-xl bg-surface">
        <FadeImage src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
        {dish.tag && (
          <span
            className={`absolute left-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-white ${
              dish.tag === "hit" ? "bg-gold-500" : "bg-forest-600"
            }`}
          >
            {dish.tag === "hit" ? "Хит" : "Новое"}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-[16px] font-bold leading-snug text-ink-900">
            {dish.name}
          </h3>
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle(dish.id);
            }}
            className="-mr-1.5 -mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full active:scale-90 transition-transform duration-200"
          >
            <Heart
              size={17}
              strokeWidth={2}
              className={fav ? "fill-forest-500 text-forest-500" : "text-ink-500"}
            />
          </span>
        </div>
        <p className="line-clamp-2 mt-1 text-[13.5px] leading-[1.45] text-ink-700">
          {dish.description}
        </p>

        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[15px] text-ink-900">{formatPrice(dish.price)}</span>

          {qty === 0 ? (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                add(dish.id);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-600 text-white active:scale-90 transition-transform duration-200"
            >
              <Plus size={15} strokeWidth={2.5} />
            </span>
          ) : (
            <span
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-full bg-forest-600 py-1 pl-1 pr-1 text-white"
            >
              <span
                role="button"
                onClick={() => remove(dish.id)}
                className="flex h-6 w-6 items-center justify-center rounded-full active:scale-90 transition-transform duration-200"
              >
                <Minus size={13} strokeWidth={2.5} />
              </span>
              <span className="min-w-[12px] text-center text-[12px] font-bold tabular-nums">
                {qty}
              </span>
              <span
                role="button"
                onClick={() => add(dish.id)}
                className="flex h-6 w-6 items-center justify-center rounded-full active:scale-90 transition-transform duration-200"
              >
                <Plus size={13} strokeWidth={2.5} />
              </span>
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
