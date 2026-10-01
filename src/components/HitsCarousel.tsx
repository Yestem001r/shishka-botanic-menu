import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Dish } from "../data/menu";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import FadeImage from "./FadeImage";

export default function HitsCarousel({
  dishes,
  onOpen,
}: {
  dishes: Dish[];
  onOpen: (dish: Dish) => void;
}) {
  const { add } = useCart();
  if (dishes.length === 0) return null;

  return (
    <section className="pt-4">
      <h2 className="mb-3 px-4 text-[20px] font-bold text-ink-900">Хиты продаж</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
        {dishes.map((dish, i) => (
          <motion.button
            key={dish.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            onClick={() => onOpen(dish)}
            className="relative w-[150px] shrink-0 overflow-hidden rounded-xl text-left active:scale-[0.97] transition-transform duration-200"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
              <FadeImage
                src={dish.image}
                alt={dish.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <span className="absolute left-2.5 top-2.5 rounded-full bg-gold-500 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white">
                Хит
              </span>
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  add(dish.id);
                }}
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-forest-800 shadow-md active:scale-90 transition-transform duration-200"
              >
                <Plus size={15} strokeWidth={2.5} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 pr-11">
                <p className="text-[14.5px] font-semibold leading-tight text-white">
                  {dish.name}
                </p>
                <p className="mt-1 text-[13px] text-white/90">{formatPrice(dish.price)}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
