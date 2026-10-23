import React from "react";
import { useOS } from "./OSContext";

interface HomeIndicatorProps {
  onSwipeUp?: () => void;
  className?: string;
  light?: boolean;
}

export const HomeIndicator: React.FC<HomeIndicatorProps> = ({
  onSwipeUp,
  className = "",
  light = false,
}) => {
  const { closeApp, isLocked } = useOS();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSwipeUp) {
      onSwipeUp();
    } else if (!isLocked) {
      closeApp();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[160px] h-[28px] flex items-center justify-center cursor-pointer z-50 group ${className}`}
      title="Home Indicator – tap or swipe to go home"
      role="button"
      tabIndex={0}
      aria-label="Go to Home screen"
    >
      <div
        className={`w-[134px] h-[5px] rounded-full transition-all duration-200 group-hover:scale-y-125 group-active:scale-95 ${
          light ? "bg-white/70" : "bg-[var(--text-1)] opacity-70 hover:opacity-100"
        }`}
      />
    </div>
  );
};
