import { AnimatePresence, motion } from "framer-motion";
import { BellRing } from "lucide-react";

export default function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -16, x: "-50%" }}
          transition={{ type: "spring", damping: 24, stiffness: 320 }}
          className="absolute left-1/2 top-4 z-50 flex items-center gap-2 rounded-full bg-surface-alt px-4 py-2.5 text-[13px] font-medium text-white shadow-float"
        >
          <BellRing size={14} className="text-forest-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
