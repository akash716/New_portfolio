import React from "react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const AboutApp: React.FC = () => {
  return (
    <AppWindow title="About">
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="w-full bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-[22px] bg-[var(--bg-3)] border border-[var(--line)] shadow-inner flex items-center justify-center font-display text-[26px] font-medium text-[var(--text-1)] shrink-0">
            {PORTFOLIO_DATA.monogram}
          </div>
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold text-[var(--text-1)] tracking-tight">
              {PORTFOLIO_DATA.name}
            </h2>
            <p className="text-[14px] text-[var(--text-2)] mt-0.5">
              {PORTFOLIO_DATA.title}
            </p>
          </div>
        </div>

        {/* Inset Section: Summary */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Executive Summary
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] text-[15px] leading-relaxed text-[var(--text-1)] shadow-sm">
            {PORTFOLIO_DATA.summary}
          </div>
        </div>

        {/* Inset Section: Location & Status */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Location &amp; Status
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
            <div className="h-[56px] px-4 flex items-center justify-between text-[15px]">
              <span className="text-[var(--text-2)]">Current City</span>
              <span className="text-[var(--text-1)] font-medium text-right">
                {PORTFOLIO_DATA.location}
              </span>
            </div>
            <div className="h-[56px] px-4 flex items-center justify-between text-[15px]">
              <span className="text-[var(--text-2)]">MCA</span>
              <span className="text-[var(--text-1)] font-medium">
                Completed Aug 2026
              </span>
            </div>
          </div>
        </div>

        {/* Inset Section: Education */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Education
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-4 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[15px] font-semibold text-[var(--text-1)]">
                    {edu.degree}
                  </span>
                  <span className="text-[13px] text-[var(--accent)] font-mono font-medium">
                    {edu.score}
                  </span>
                </div>
                {edu.institution && (
                  <div className="text-[13px] text-[var(--text-2)]">
                    {edu.institution}
                  </div>
                )}
                <div className="text-[12px] text-[var(--text-3)]">
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inset Section: Languages */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Languages
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
            {PORTFOLIO_DATA.languages.map((lang, idx) => (
              <div
                key={idx}
                className="h-[56px] px-4 flex items-center justify-between text-[15px]"
              >
                <span className="text-[var(--text-1)] font-medium">
                  {lang.name}
                </span>
                {lang.nativeName && (
                  <span
                    lang={lang.name === "Hindi" ? "hi" : "mr"}
                    className="text-[var(--text-2)] font-hindi text-[16px]"
                  >
                    {lang.nativeName}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inset Section: Certifications & Additional */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Certifications &amp; Activities
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
            {PORTFOLIO_DATA.certifications.map((cert, idx) => (
              <div key={idx} className="min-h-[56px] px-4 py-4 flex items-center text-[14px] text-[var(--text-1)]">
                {cert}
              </div>
            ))}
            {PORTFOLIO_DATA.additional.map((item, idx) => (
              <div key={idx} className="min-h-[56px] px-4 py-4 flex items-center text-[14px] text-[var(--text-2)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
};
