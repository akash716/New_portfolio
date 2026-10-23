import React, { useState, useRef, ReactNode } from "react";
import { motion } from "motion/react";
import { useOS } from "./OSContext";
import { springs, reducedMotionTransition } from "./motion";
import { IconChevronLeft } from "./Icons";
import { HomeIndicator } from "./HomeIndicator";

interface AppWindowProps {
  title: string;
  parentTitle?: string;
  onBack?: () => void;
  children: ReactNode;
  rightAction?: ReactNode;
  coverImage?: ReactNode;
  noPadding?: boolean;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  title,
  parentTitle = "Home",
  onBack,
  children,
  rightAction,
  coverImage,
  noPadding = false,
}) => {
  const { closeApp, reducedMotion } = useOS();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showInlineTitle, setShowInlineTitle] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      closeApp();
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    setShowInlineTitle(top > 44);
  };

  return (
    <motion.section
      aria-label={title}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.92, y: 20, borderRadius: "38px" }
      }
      animate={{ opacity: 1, scale: 1, y: 0, borderRadius: "0px" }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.9, y: 40, borderRadius: "44px" }
      }
      transition={reducedMotion ? reducedMotionTransition : springs.app}
      className="absolute inset-0 z-40 bg-[var(--bg-1)] text-[var(--text-1)] flex flex-col overflow-hidden select-text"
    >
      {/* Top Glass Navigation Bar */}
      <div
        className={`sticky top-0 z-30 w-full h-[56px] px-4 flex items-center justify-between transition-all duration-200 ${
          showInlineTitle
            ? "ios-glass border-b border-[var(--line)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="min-w-[44px] min-h-[44px] -ml-2 px-2 flex items-center gap-0.5 text-[var(--accent)] font-normal text-[17px] hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          aria-label={`Back to ${parentTitle}`}
        >
          <IconChevronLeft size={22} strokeWidth={2.2} />
          <span className="truncate max-w-[120px]">{parentTitle}</span>
        </button>

        {/* Collapsed Inline Title */}
        <div
          className={`flex-1 text-center font-semibold text-[17px] tracking-tight transition-opacity duration-200 truncate px-2 ${
            showInlineTitle ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {title}
        </div>

        {/* Right contextual action slot */}
        <div className="min-w-[44px] flex items-center justify-end">
          {rightAction || <div className="w-[44px]" />}
        </div>
      </div>

      {/* Main Scrollable Body */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`flex-1 overflow-y-auto overscroll-contain no-scrollbar ${
          noPadding ? "p-0" : "px-4 pb-24 pt-2"
        }`}
      >
        {coverImage}

        {/* Large Title Area if not already collapsed */}
        {!coverImage && (
          <div className="pt-2 pb-6 px-2">
            <h1 className="text-[34px] font-bold font-display tracking-tight leading-tight text-[var(--text-1)]">
              {title}
            </h1>
          </div>
        )}

        {children}
      </div>

      {/* Home Indicator */}
      <HomeIndicator onSwipeUp={closeApp} />
    </motion.section>
  );
};
