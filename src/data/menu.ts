export type CategoryId =
  | "breakfast"
  | "starters"
  | "soups"
  | "pasta-pizza"
  | "meat"
  | "fish"
  | "desserts";

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
}

export const categories: Category[] = [
  { id: "breakfast", label: "Завтраки", shortLabel: "Завтраки" },
  { id: "starters", label: "Закуски и салаты", shortLabel: "Закуски" },
  { id: "soups", label: "Супы", shortLabel: "Супы" },
  { id: "pasta-pizza", label: "Паста и пицца", shortLabel: "Паста" },
  { id: "meat", label: "Мясо", shortLabel: "Мясо" },
  { id: "fish", label: "Рыба", shortLabel: "Рыба" },
  { id: "desserts", label: "Десерты", shortLabel: "Десерты" },
];

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  tag?: "hit" | "new";
}

export const dishes: Dish[] = [
  {
    id: "english-breakfast",
    name: "Английский завтрак",
    description:
      "Яичница, фермерские колбаски, жареные грибы, сладкая кукуруза и хрустящие тосты.",
    price: 3290,
    category: "breakfast",
    image: `${import.meta.env.BASE_URL}images/dishes/english-breakfast.jpg`,
  },
  {
    id: "salmon-omelette",
    name: "Омлет с лососем",
    description:
      "Нежный омлет, слабосоленый лосось, хрустящий багет с гуакомоле и свежий салат.",
    price: 4890,
    category: "breakfast",
    image: `${import.meta.env.BASE_URL}images/dishes/salmon-omelette.jpg`,
  },
  {
    id: "gourmet-breakfast",
    name: "Завтрак гурмана",
    description:
      "Тост с авокадо, яйцо-глазунья, слабосоленый лосось и свежий микс-салат.",
    price: 4690,
    category: "breakfast",
    image: `${import.meta.env.BASE_URL}images/dishes/gourmet-breakfast.jpg`,
  },
  {
    id: "burrata-mango",
    name: "Буратта с манго",
    description:
      "Помидоры черри и руккола, при подаче заправляется соусом песто.",
    price: 5490,
    category: "starters",
    image: `${import.meta.env.BASE_URL}images/dishes/burrata-mango.jpg`,
    tag: "hit",
  },
  {
    id: "baked-pepper-stracciatella",
    name: "Перец запеченный со страчателлой",
    description: "Печёный перец, нежная страчателла и хрустящая чиабатта.",
    price: 4590,
    category: "starters",
    image: `${import.meta.env.BASE_URL}images/dishes/baked-pepper-stracciatella.jpg`,
  },
  {
    id: "roastbeef-salad",
    name: "Салат с ростбифом",
    description: "Шампиньоны, вяленые томаты и медово-горчичный соус.",
    price: 6290,
    category: "starters",
    image: `${import.meta.env.BASE_URL}images/dishes/roastbeef-salad.jpg`,
  },
  {
    id: "duck-salad",
    name: "Салат с копченым филе утки",
    description: "Руккола, груша и грецкий орех.",
    price: 4390,
    category: "starters",
    image: `${import.meta.env.BASE_URL}images/dishes/duck-salad.jpg`,
  },
  {
    id: "tom-yum",
    name: "Классический суп Том-Ям",
    description:
      "Пряный тайский суп с ароматными тайскими травами, подаётся с рисом.",
    price: 4290,
    category: "soups",
    image: `${import.meta.env.BASE_URL}images/dishes/tom-yum.jpg`,
    tag: "hit",
  },
  {
    id: "ramen-beef",
    name: "Рамен с говядиной",
    description: "Наваристый бульон, говядина, яйцо пашот и овощи.",
    price: 4590,
    category: "soups",
    image: `${import.meta.env.BASE_URL}images/dishes/ramen-beef.jpg`,
  },
  {
    id: "pasta-seafood-tomyum",
    name: "Паста с морепродуктами том-ям",
    description:
      "Лингвини с сёмгой, кальмарами и креветками в соусе том-ям, с пармезаном и мидиями.",
    price: 5390,
    category: "pasta-pizza",
    image: `${import.meta.env.BASE_URL}images/dishes/pasta-seafood-tomyum.jpg`,
    tag: "hit",
  },
  {
    id: "pizza-salmon",
    name: "Пицца с семгой и шпинатом",
    description: "Сёмга, жареный шпинат и сливочный соус на тонком тесте.",
    price: 4890,
    category: "pasta-pizza",
    image: `${import.meta.env.BASE_URL}images/dishes/pizza-salmon.jpg`,
  },
  {
    id: "filet-mignon",
    name: "Филе миньон",
    description: "Томлёный картофель, грибы и ароматный перечный соус.",
    price: 12590,
    category: "meat",
    image: `${import.meta.env.BASE_URL}images/dishes/filet-mignon.jpg`,
    tag: "hit",
  },
  {
    id: "tibone-steak",
    name: "Стейк Ти-бон",
    description: "Классический стейк на кости, обжаренный на гриле.",
    price: 12690,
    category: "meat",
    image: `${import.meta.env.BASE_URL}images/dishes/tibone-steak.jpg`,
  },
  {
    id: "ribeye-steak",
    name: "Рибай",
    description: "Мраморная говядина на гриле с домашним соусом BBQ.",
    price: 14290,
    category: "meat",
    image: `${import.meta.env.BASE_URL}images/dishes/ribeye-steak.jpg`,
  },
  {
    id: "salmon-fillet",
    name: "Филе сёмги с морковным кремом",
    description: "Сёмга на гриле, морковный крем, спаржа и сливочно-икорный соус.",
    price: 9590,
    category: "fish",
    image: `${import.meta.env.BASE_URL}images/dishes/salmon-fillet.jpg`,
  },
  {
    id: "dorado",
    name: "Дорадо с броколли",
    description: "Филе дорадо на гриле с броколли в сливочно-икорном соусе.",
    price: 9290,
    category: "fish",
    image: `${import.meta.env.BASE_URL}images/dishes/dorado.jpg`,
  },
  {
    id: "belgian-waffles",
    name: "Бельгийские вафли",
    description: "Хрустящие вафли, свежая клубника и шарик ванильного мороженого.",
    price: 4290,
    category: "desserts",
    image: `${import.meta.env.BASE_URL}images/dishes/belgian-waffles.jpg`,
    tag: "new",
  },
  {
    id: "spanish-cheesecake",
    name: "Испанский чизкейк",
    description: "Нежный чизкейк с карамелизированной корочкой по-испански.",
    price: 3890,
    category: "desserts",
    image: `${import.meta.env.BASE_URL}images/dishes/spanish-cheesecake.jpg`,
    tag: "new",
  },
];
