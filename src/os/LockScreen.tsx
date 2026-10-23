import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useOS } from "./OSContext";
import { springs, reducedMotionTransition } from "./motion";
import { IconResume, IconContact } from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { HomeIndicator } from "./HomeIndicator";

export const LockScreen: React.FC = () => {
  const { unlock, openApp, reducedMotion } = useOS();
  const [time, setTime] = useState({ hours: "12", minutes: "37" });
  const [dateStr, setDateStr] = useState("Thursday, 1 October");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime({ hours: h, minutes: m });

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
      };
      setDateStr(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleShortcutResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlock();
    openApp("resume");
  };

  const handleShortcutContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    unlock();
    openApp("contact");
  };

  const handleNotificationClick = (appId?: string) => {
    unlock();
    if (appId) {
      setTimeout(() => openApp(appId), 150);
    }
  };

  return (
    <motion.section
      aria-label="Lock screen"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -844 }}
      transition={
        reducedMotion
          ? reducedMotionTransition
          : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }
      }
      onClick={unlock}
      className="absolute inset-0 z-40 flex flex-col justify-between os-wallpaper text-[var(--text-1)] cursor-pointer select-none overflow-hidden"
    >
      {/* Top Header & Serif Clock */}
      <div className="relative pt-[72px] flex flex-col items-center z-10 px-6 text-center">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-[17px] font-semibold tracking-tight text-[var(--text-2)]"
        >
          {dateStr}
        </motion.div>

        {/* Big Newsreader Display Clock */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="text-[88px] sm:text-[96px] font-normal font-display leading-none tracking-[-0.03em] tabular-nums mt-1 text-[var(--text-1)] select-none"
        >
          {time.hours}:{time.minutes}
        </motion.div>

        {/* Subhead Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="text-[15px] font-medium tracking-tight text-[var(--text-2)] mt-2"
        >
          {PORTFOLIO_DATA.subhead}
        </motion.div>
      </div>

      {/* Center Notification Stack */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion ? reducedMotionTransition : { ...springs.app, delay: 0.25 }
        }
        className="relative z-10 px-6 w-full max-w-[360px] mx-auto space-y-3"
      >
        {/* Notification 1: Education */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNotificationClick("about");
          }}
          className="w-full h-[72px] ios-glass rounded-[20px] px-4 py-3 flex items-center gap-3.5 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--bg-2)] border border-[var(--line)] flex items-center justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold tracking-tight text-[var(--text-1)]">
                Education · MCA
              </span>
              <span className="text-[11px] text-[var(--text-3)]">now</span>
            </div>
            <p className="text-[13px] text-[var(--text-2)] truncate mt-0.5">
              Completed Aug 2026 · CGPA 8.43 / 10
            </p>
          </div>
        </div>

        {/* Notification 2: Latest Project */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNotificationClick("projects/vendi");
          }}
          className="w-full h-[72px] ios-glass rounded-[20px] px-4 py-3 flex items-center gap-3.5 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--bg-2)] border border-[var(--line)] flex items-center justify-center shrink-0 text-xs font-mono font-medium text-[var(--text-1)]">
            POS
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold tracking-tight text-[var(--text-1)]">
                Latest project · Vendi POS
              </span>
              <span className="text-[11px] text-[var(--text-3)]">live</span>
            </div>
            <p className="text-[13px] text-[var(--text-2)] truncate mt-0.5">
              Live on Railway, Render, Vercel · MySQL optimization
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Shortcuts & Unlock prompt */}
      <div className="relative z-10 pb-8 px-8 flex flex-col items-center">
        {/* Two 50px glass circles */}
        <div className="w-full flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handleShortcutResume}
            className="w-[50px] h-[50px] rounded-full ios-glass flex items-center justify-center text-[var(--text-1)] hover:brightness-110 active:scale-95 transition-all shadow-md"
            title="Open Resume"
            aria-label="Open Resume"
          >
            <IconResume size={22} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={handleShortcutContact}
            className="w-[50px] h-[50px] rounded-full ios-glass flex items-center justify-center text-[var(--text-1)] hover:brightness-110 active:scale-95 transition-all shadow-md"
            title="Open Contact"
            aria-label="Open Contact"
          >
            <IconContact size={22} strokeWidth={1.8} />
          </button>
        </div>

        {/* Swipe up to open text */}
        <div className="text-[13px] text-[var(--text-3)] font-medium tracking-tight mb-2">
          Swipe up or tap to open
        </div>

        {/* Home Indicator */}
        <HomeIndicator onSwipeUp={unlock} />
      </div>
    </motion.section>
  );
};
