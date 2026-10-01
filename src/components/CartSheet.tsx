import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import FadeImage from "./FadeImage";

export default function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, total, add, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => setPlaced(false), 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 z-40 bg-black/60"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="absolute inset-x-0 bottom-0 z-50 flex max-h-[85%] flex-col overflow-hidden rounded-t-[18px] bg-surface px-4 pb-4 pt-5"
          >
            {placed ? (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 14 }}
                >
                  <CheckCircle2 size={52} className="text-forest-500" />
                </motion.div>
                <h3 className="mt-4 text-[20px] font-semibold text-ink-900">
                  Заказ отправлен!
                </h3>
                <p className="mt-2 max-w-[240px] text-[14px] text-ink-700">
                  Официант уже несёт его на кухню. Среднее время ожидания — 20
                  минут.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-xl bg-forest-600 py-3.5 text-[14px] font-semibold text-white active:scale-[0.98] transition-transform"
                >
                  Вернуться в меню
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[20px] font-semibold text-ink-900">Ваш заказ</h2>
                  <button
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt active:scale-90 transition-transform duration-200"
                  >
                    <X size={17} className="text-ink-900" />
                  </button>
                </div>

                <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
                  {items.length === 0 && (
                    <p className="py-10 text-center text-[14px] text-ink-500">
                      Корзина пуста
                    </p>
                  )}
                  {items.map(({ dish, qty }) => (
                    <div
                      key={dish.id}
                      className="flex items-center gap-3 rounded-xl bg-surface-alt p-2.5"
                    >
                      <FadeImage
                        src={dish.image}
                        alt={dish.name}
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-ink-900">
                          {dish.name}
                        </p>
                        <p className="text-[13.5px] text-ink-700">
                          {formatPrice(dish.price * qty)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-bg px-1 py-1">
                        <button
                          onClick={() => remove(dish.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md active:scale-90 transition-transform duration-200"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="min-w-[14px] text-center text-[13px] font-bold tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => add(dish.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-md active:scale-90 transition-transform duration-200"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {items.length > 0 && (
                  <div className="mt-4 border-t border-line px-1 pt-4">
                    <div className="flex items-center justify-between text-[14px] text-ink-700">
                      <span>Сервисный сбор (11%)</span>
                      <span>{formatPrice(Math.round(total * 0.11))}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[18px] font-semibold text-ink-900">
                      <span>Итого</span>
                      <span>{formatPrice(Math.round(total * 1.11))}</span>
                    </div>
                    <button
                      onClick={() => {
                        setPlaced(true);
                        clear();
                      }}
                      className="mt-4 w-full rounded-xl bg-forest-600 py-4 text-[15px] font-semibold text-white shadow-float active:scale-[0.98] transition-transform"
                    >
                      Оформить заказ
                    </button>
                    <p className="mt-2.5 text-center text-[12px] text-ink-500">
                      Оплата — у официанта, как обычно
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
