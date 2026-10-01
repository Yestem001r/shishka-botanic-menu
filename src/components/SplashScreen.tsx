import { motion } from "framer-motion";

export default function SplashScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-forest-950">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        src={`${import.meta.env.BASE_URL}images/hero/splash-hero.jpg`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/75 via-forest-950/10 to-forest-950/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-7 pb-12 pt-14">
        <motion.img
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          src={`${import.meta.env.BASE_URL}images/hero/wordmark.png`}
          alt="Shishka Botanic"
          className="w-[82%] max-w-[360px] drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-5 max-w-[300px] text-[16px] leading-[1.6] text-cream-100/85"
        >
          Добро пожаловать! Пространство для встреч, долгих разговоров и
          любимых блюд. Открыто ежедневно с 11:00.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpen}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-cream-100 py-4 text-[16px] font-semibold text-forest-900 shadow-float"
        >
          Смотреть меню
        </motion.button>
      </div>
    </div>
  );
}
