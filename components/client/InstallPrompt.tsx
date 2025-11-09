'use client';
import { usePwaInstallHandler } from '@/hooks/usePwaInstallHandler';
import { DownloadIcon, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPrompt() {
  const { canInstall, promptInstall } = usePwaInstallHandler();
  const [visible, setVisible] = useState(true);

  if (!canInstall || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="install-banner"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50 max-w-[90%] sm:max-w-sm"
      >
        <div className="relative p-px rounded-2xl shadow-2xl">
          <div className="bg-zinc-900 rounded-2xl flex items-center gap-3 p-4 backdrop-blur-lg text-white">
            <div className="flex-1 text-xs sm:text-base leading-tight">
              <p className="font-semibold text-sm md:text-base mb-2 text-white">Install FlowKeep</p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Get the FlowKeep app - launch instantly and stay productive anywhere.
              </p>
            </div>

            <button
              onClick={() => promptInstall()}
              className="flex items-center cursor-pointer gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium px-3 py-2 rounded-xl transition"
            >
              <DownloadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden text-sm sm:inline">Install</span>
            </button>

            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-zinc-400 cursor-pointer hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
