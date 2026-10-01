import { useEffect, useMemo, useRef, useState } from "react";
import { HeartOff } from "lucide-react";
import Header from "./Header";
import CategoryNav from "./CategoryNav";
import HitsCarousel from "./HitsCarousel";
import DishCard from "./DishCard";
import DishModal from "./DishModal";
import CartBar from "./CartBar";
import CartSheet from "./CartSheet";
import Toast from "./Toast";
import { categories, dishes, type CategoryId, type Dish } from "../data/menu";
import { useFavorites } from "../context/FavoritesContext";

export default function MenuScreen() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>("breakfast");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const { isFavorite } = useFavorites();

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<CategoryId, HTMLElement>>>({});
  const isClickScrolling = useRef(false);

  const hits = useMemo(() => dishes.filter((d) => d.tag === "hit"), []);

  const filtered = useMemo(() => {
    let list = dishes;
    if (favoritesOnly) list = list.filter((d) => isFavorite(d.id));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, favoritesOnly, isFavorite]);

  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({
        cat,
        items: filtered.filter((d) => d.category === cat.id),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const showNav = !query && !favoritesOnly;

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || query || favoritesOnly) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("data-cat") as CategoryId;
          if (id) setActive(id);
        }
      },
      { root, rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [query, favoritesOnly, grouped.length]);

  const handleSelectCategory = (id: CategoryId) => {
    setActive(id);
    const el = sectionRefs.current[id];
    if (el && scrollRef.current) {
      isClickScrolling.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => (isClickScrolling.current = false), 600);
    }
  };

  const handleCallWaiter = () => {
    setToast("Официант уже идёт к вам 🙌");
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-bg">
      <Header
        query={query}
        onQueryChange={setQuery}
        onCallWaiter={handleCallWaiter}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
      />
      {showNav && <CategoryNav active={active} onSelect={handleSelectCategory} />}

      <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto pb-28">
        {favoritesOnly && (
          <h2 className="px-4 pb-1 pt-5 text-[20px] font-bold text-ink-900">Избранное</h2>
        )}

        {!query && !favoritesOnly && <HitsCarousel dishes={hits} onOpen={setSelectedDish} />}

        {grouped.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            {favoritesOnly && !query ? (
              <>
                <HeartOff size={28} className="text-ink-500" />
                <p className="max-w-[220px] text-[14px] text-ink-700">
                  Нажмите ♥ на понравившихся блюдах — они появятся здесь
                </p>
              </>
            ) : (
              <p className="text-[14px] text-ink-700">Ничего не нашлось</p>
            )}
          </div>
        )}
        {grouped.map(({ cat, items }) => (
          <section
            key={cat.id}
            data-cat={cat.id}
            ref={(el) => {
              if (el) sectionRefs.current[cat.id] = el;
            }}
            className="px-4 pt-6 first:pt-5"
          >
            <h2 className="mb-1 text-[20px] font-bold text-ink-900">{cat.label}</h2>
            <div className="flex flex-col">
              {items.map((dish) => (
                <DishCard key={dish.id} dish={dish} onOpen={setSelectedDish} />
              ))}
            </div>
          </section>
        ))}
        <div className="h-2" />
      </div>

      <CartBar onOpen={() => setCartOpen(true)} />
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast message={toast} />
    </div>
  );
}
