"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 items-start"
          >
            <a
              href="https://wa.me/2349011191919"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-cream text-ink shadow-lg pl-2 pr-4 py-2 rounded-full border border-ink/5 hover:bg-white"
            >
              <span className="w-9 h-9 rounded-full bg-[#25D366] text-white grid place-items-center">
                <MessageCircle size={16} />
              </span>
              <span className="text-sm font-medium pl-1">WhatsApp us</span>
            </a>
            <a
              href="tel:+2348090500100"
              className="group flex items-center gap-3 bg-cream text-ink shadow-lg pl-2 pr-4 py-2 rounded-full border border-ink/5 hover:bg-white"
            >
              <span className="w-9 h-9 rounded-full bg-maroon text-cream grid place-items-center">
                <Phone size={15} />
              </span>
              <span className="text-sm font-medium pl-1">Call sales</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-maroon text-cream shadow-[0_10px_30px_-8px_rgba(153,0,0,0.5)] grid place-items-center hover:bg-maroon-700 transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-maroon animate-ping opacity-30" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
