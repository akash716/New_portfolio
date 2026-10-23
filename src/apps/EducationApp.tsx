import React from "react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { IconEducation } from "../os/Icons";

export const EducationApp: React.FC = () => {
  return (
    <AppWindow title="Education">
      <div className="space-y-4">
        {PORTFOLIO_DATA.education.map((edu, idx) => (
          <div
            key={idx}
            className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] shadow-sm hover:border-[var(--text-2)] transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-10 h-10 rounded-[14px] bg-[var(--bg-3)] flex items-center justify-center text-[var(--accent)] shrink-0">
                <IconEducation size={22} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="min-w-0 flex-1 text-[16px] leading-snug font-semibold text-[var(--text-1)] tracking-tight">
                    {edu.degree}
                  </h3>
                  <span className="w-[78px] shrink-0 break-words text-right text-[12px] leading-tight font-mono font-medium text-[var(--accent)]">
                    {edu.score}
                  </span>
                </div>
                {edu.institution && (
                  <p className="text-[14px] text-[var(--text-2)] mt-1">
                    {edu.institution}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-[12px] text-[var(--text-3)]">
                  <span>{edu.year}</span>
                  {edu.location && (
                    <>
                      <span>·</span>
                      <span>{edu.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </AppWindow>
  );
};
