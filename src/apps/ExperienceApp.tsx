import React from "react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const ExperienceApp: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <AppWindow title="Experience">
      <div className="max-w-[60ch] mx-auto space-y-6">
        {/* Notes Style Header */}
        <div className="border-b border-[var(--line)] pb-4">
          <div className="text-[12px] text-[var(--text-3)] font-mono uppercase tracking-wider mb-1">
            Internship Note · Completed
          </div>
          <h1 className="text-[34px] font-bold font-display tracking-tight text-[var(--text-1)]">
            {experience.company}
          </h1>
          <p className="text-[15px] text-[var(--text-2)] font-medium mt-1">
            {experience.role} · {experience.duration} · {experience.location}
          </p>
        </div>

        {/* Narrative / Bullet Body */}
        <div className="space-y-4 text-[16px] text-[var(--text-1)] leading-[1.6]">
          {experience.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className="text-[var(--accent)] font-bold text-sm mt-1 select-none">
                —
              </span>
              <p className="flex-1">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Associated Client Projects Card */}
        <div className="mt-8 bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] shadow-sm">
          <h3 className="text-[15px] font-semibold text-[var(--text-1)] mb-2">
            Client Implementations Delivered
          </h3>
          <p className="text-[14px] text-[var(--text-2)] leading-relaxed mb-4">
            During this 1-year internship, delivered full-stack and WordPress solutions across retail, branding, and media:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            <div className="p-4 rounded-xl bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--line)]">
              <span className="font-semibold block truncate">Vendi Chocolates</span>
              <span className="text-[var(--text-2)] text-[12px] block mt-0.5">React, Node, MySQL</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--line)]">
              <span className="font-semibold block truncate">Go Sarthii</span>
              <span className="text-[var(--text-2)] text-[12px] block mt-0.5">React, Vite UI</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--line)]">
              <span className="font-semibold block truncate">Goswami Storage</span>
              <span className="text-[var(--text-2)] text-[12px] block mt-0.5">Industrial Catalog</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-3)] text-[var(--text-1)] border border-[var(--line)]">
              <span className="font-semibold block truncate">Hangover Media</span>
              <span className="text-[var(--text-2)] text-[12px] block mt-0.5">Media Agency Site</span>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
};
