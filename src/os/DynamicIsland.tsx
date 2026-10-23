import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "./OSContext";
import { springs } from "./motion";
import { IconCheck, IconResume, IconContact } from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const DynamicIsland: React.FC = () => {
  const {
    isMobileDevice,
    islandNotification,
    isIslandExpanded,
    toggleIslandExpanded,
    openApp,
    triggerIslandNotification,
    reducedMotion,
  } = useOS();

  // Hidden on real mobile phones (<= 640px)
  if (isMobileDevice) return null;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(PORTFOLIO_DATA.email);
    triggerIslandNotification("Email copied", "check");
  };

  const handleOpenResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    openApp("resume");
  };

  return (
    <div className="absolute top-[11px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
      <motion.div
        layout
        transition={reducedMotion ? { duration: 0.15 } : springs.playful}
        onClick={toggleIslandExpanded}
        className={`bg-black text-[#F5F3EE] cursor-pointer flex items-center justify-between px-3 select-none overflow-hidden ${
          isIslandExpanded
            ? "w-[280px] h-[54px] rounded-[27px] py-2 px-4 shadow-2xl"
            : islandNotification
            ? "w-[220px] h-[37px] rounded-[19px] px-3.5"
            : "w-[126px] h-[37px] rounded-[19px]"
        }`}
        style={{
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {islandNotification ? (
            <motion.div
              key="notification"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full text-xs font-medium"
            >
              <div className="flex items-center gap-1.5">
                {islandNotification.icon === "available" && (
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                )}
                {islandNotification.icon === "check" && (
                  <IconCheck size={14} strokeWidth={2.5} className="text-[var(--text-1)]" />
                )}
                <span className="tracking-tight text-white">
                  {islandNotification.message}
                </span>
              </div>
              <span className="text-[10px] text-white/50 tracking-wider font-mono">
                OS
              </span>
            </motion.div>
          ) : isIslandExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-semibold tracking-tight text-white">
                  Akash Patankar
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-medium bg-white/15 hover:bg-white/25 active:scale-95 text-white rounded-full transition-all flex items-center gap-1"
                  title="Copy email"
                >
                  <IconContact size={12} />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenResume}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[var(--accent)] hover:brightness-110 active:scale-95 text-white rounded-full transition-all flex items-center gap-1"
                  title="View resume"
                >
                  <IconResume size={12} />
                  <span>Resume</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full px-1"
            >
              {/* Sensor lens reflection simulation */}
              <div className="w-3 h-3 rounded-full bg-[#111] border border-white/10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1f]" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0d] border border-white/5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
