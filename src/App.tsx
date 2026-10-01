import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PhoneShell from "./components/PhoneShell";
import SplashScreen from "./components/SplashScreen";
import MenuScreen from "./components/MenuScreen";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <FavoritesProvider>
      <CartProvider>
        <PhoneShell>
          <AnimatePresence initial={false} mode="wait">
            {!opened ? (
              <motion.div
                key="splash"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full w-full"
              >
                <SplashScreen onOpen={() => setOpened(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                <MenuScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneShell>
      </CartProvider>
    </FavoritesProvider>
  );
}
