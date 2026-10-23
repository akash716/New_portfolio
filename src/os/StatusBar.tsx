import React, { useState, useEffect } from "react";
import { useOS } from "./OSContext";
import { IconTargetFocus } from "./Icons";

export const StatusBar: React.FC = () => {
  const { recruiterFocus, setRecruiterFocus } = useOS();
  const [timeStr, setTimeStr] = useState("12:37");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formatted = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full h-[54px] px-6 pt-3 flex items-center justify-between text-[var(--text-1)] select-none z-40">
      {/* Time */}
      <div className="w-16 flex items-center">
        <span className="text-[14px] font-semibold tracking-tight font-ui tabular-nums">
          {timeStr}
        </span>
      </div>

      {/* Recruiter Focus Mode Pill in center/status bar */}
      <div className="flex-1 flex justify-center items-center">
        {recruiterFocus && (
          <button
            type="button"
            onClick={() => setRecruiterFocus(false)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--accent)] text-white shadow-sm transition-all hover:brightness-110 active:scale-95"
            title="Recruiter Focus Mode active – click to exit"
            aria-label="Exit Recruiter Focus Mode"
          >
            <IconTargetFocus size={12} strokeWidth={2.5} />
            <span>Focus</span>
          </button>
        )}
      </div>

      {/* Right Status Indicators: Cellular, WiFi, Battery */}
      <div className="w-16 flex items-center justify-end gap-1.5 text-[var(--text-1)]">
        {/* Cellular Signal (4 bars) */}
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="9" width="3" height="3" rx="0.5" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>

        {/* WiFi */}
        <svg
          width="15"
          height="12"
          viewBox="0 0 16 12"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-3.5-3a5.5 5.5 0 0 1 7 0 .8.8 0 0 1-.2 1.2.8.8 0 0 1-1.1-.1 3.9 3.9 0 0 0-4.4 0 .8.8 0 0 1-1.1.1.8.8 0 0 1-.2-1.2Zm-3.5-3a10.5 10.5 0 0 1 14 0 .8.8 0 0 1-.2 1.2.8.8 0 0 1-1.1-.1 8.9 8.9 0 0 0-11.4 0 .8.8 0 0 1-1.1.1.8.8 0 0 1-.2-1.2Z" />
        </svg>

        {/* Battery */}
        <div className="relative flex items-center">
          <div className="w-[22px] h-[11.5px] rounded-[3px] border border-current p-[1.5px] flex items-center">
            <div className="h-full w-[82%] bg-current rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-current rounded-r-[1px] ml-[1px]" />
        </div>
      </div>
    </header>
  );
};
