import { AnimatePresence, motion } from "framer-motion";
import { BellRing, CheckCircle2, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import type { Dish } from "../data/menu";
import FadeImage from "./FadeImage";

interface PlacedOrder {
  items: { dish: Dish; qty: number }[];
  total: number;
}

export default function CartSheet({
  open,
  onClose,
  onCallWaiter,
}: {
  open: boolean;
  onClose: () => void;
  onCallWaiter: () => void;
}) {
  const { items, total, add, remove, clear } = useCart();
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => setPlacedOrder(null), 300);
  };

  const handlePlace = () => {
    setPlacedOrder({ items, total: Math.round(total * 1.11) });
    clear();
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
            {placedOrder ? (
              <div className="flex flex-col py-2 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 14 }}
                  className="self-center"
                >
                  <CheckCircle2 size={48} className="text-forest-500" />
                </motion.div>
                <h3 className="mt-3 text-[20px] font-semibold text-ink-900">
                  Отличный выбор!
                </h3>
                <p className="mx-auto mt-1.5 max-w-[260px] text-[14px] text-ink-700">
                  Покажите этот экран официанту, чтобы подтвердить заказ
                </p>

                <div className="mt-5 space-y-1.5 rounded-xl bg-surface-alt p-3.5 text-left">
                  {placedOrder.items.map(({ dish, qty }) => (
                    <div
                      key={dish.id}
                      className="flex items-center justify-between gap-3 text-[14px]"
                    >
                      <span className="text-ink-900">
                        {dish.name}{" "}
                        <span className="text-ink-500">×{qty}</span>
                      </span>
                      <span className="shrink-0 text-ink-700">
                        {formatPrice(dish.price * qty)}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-line pt-2 text-[15px] font-semibold text-ink-900">
                    <span>Итого</span>
                    <span>{formatPrice(placedOrder.total)}</span>
                  </div>
                </div>

                <button
                  onClick={onCallWaiter}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-forest-600 py-3.5 text-[14px] font-semibold text-white active:scale-[0.98] transition-transform"
                >
                  <BellRing size={15} />
                  Позвать официанта
                </button>
                <button
                  onClick={handleClose}
                  className="mt-2.5 w-full rounded-xl bg-surface-alt py-3.5 text-[14px] font-semibold text-ink-900 active:scale-[0.98] transition-transform"
                >
                  Готово
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
                      onClick={handlePlace}
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
