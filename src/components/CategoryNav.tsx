import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Beef, Coffee, Fish, IceCream2, Pizza, Salad, Soup } from "lucide-react";
import { categories, type CategoryId } from "../data/menu";

const icons: Record<CategoryId, React.ElementType> = {
  breakfast: Coffee,
  starters: Salad,
  soups: Soup,
  "pasta-pizza": Pizza,
  meat: Beef,
  fish: Fish,
  desserts: IceCream2,
};

export default function CategoryNav({
  active,
  onSelect,
}: {
  active: CategoryId;
  onSelect: (id: CategoryId) => void;
}) {
  const buttonRefs = useRef<Partial<Record<CategoryId, HTMLButtonElement>>>({});

  useEffect(() => {
    buttonRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
      {categories.map((cat) => {
        const Icon = icons[cat.id];
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            ref={(el) => {
              if (el) buttonRefs.current[cat.id] = el;
            }}
            onClick={() => onSelect(cat.id)}
            className="relative flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-3 text-[14px]"
          >
            {isActive && (
              <motion.span
                layoutId="activeCategoryPill"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 rounded-lg bg-surface-alt"
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                isActive ? "font-medium text-ink-900" : "font-normal text-ink-700"
              }`}
            >
              <Icon size={14} strokeWidth={2} />
              {cat.shortLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
