import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";

export default function CartBar({ onOpen }: { onOpen: () => void }) {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <motion.button
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      onClick={onOpen}
      className="absolute inset-x-4 bottom-5 z-30 flex items-center justify-between rounded-xl bg-forest-600 px-4 py-4 text-white shadow-float active:scale-[0.98] transition-transform"
    >
      <span className="flex items-center gap-2.5">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <ShoppingBag size={16} />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white">
            {count}
          </span>
        </span>
        <span className="text-[14px] font-semibold">Корзина</span>
      </span>
      <span className="text-[16px] font-bold">{formatPrice(total)}</span>
    </motion.button>
  );
}
