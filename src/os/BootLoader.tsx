import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "./OSContext";
import { PORTFOLIO_DATA } from "../data/portfolio";

interface BootLoaderProps {
  onBootComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onBootComplete }) => {
  const { reducedMotion } = useOS();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onBootComplete();
      return;
    }

    // Keep the intro short so it does not feel like a slow page load.
    const t1 = setTimeout(() => setProgress(25), 80);
    const t2 = setTimeout(() => setProgress(55), 160);
    const t3 = setTimeout(() => setProgress(80), 260);
    const t4 = setTimeout(() => setProgress(100), 360);
    const t5 = setTimeout(() => setIsFinished(true), 450);
    const t6 = setTimeout(onBootComplete, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [reducedMotion, onBootComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(onBootComplete, 100);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          onClick={handleSkip}
          className="absolute inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {/* Subtle ambient lens glow */}
          <div className="absolute w-[240px] h-[240px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

          {/* Monogram / Apple-style emblem */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-16 h-16 rounded-[22px] bg-[#141416] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center justify-center text-white font-display text-[26px] font-medium tracking-tight mb-8"
          >
            {PORTFOLIO_DATA.monogram}
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-[140px] h-[3.5px] rounded-full bg-white/15 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Subtle OS Boot Tag */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[11px] text-white tracking-[0.2em] uppercase font-mono mt-5"
          >
            Akash OS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
