import React, { useState } from "react";
import { motion } from "motion/react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { springs, reducedMotionTransition } from "../os/motion";
import { useOS } from "../os/OSContext";

export const SkillsApp: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const { reducedMotion } = useOS();

  // Distinct background tones from palette: bg-1, bg-2, bg-3, bg-4
  const cardBgs = [
    "bg-[var(--bg-1)] border-[var(--line)] shadow-lg",
    "bg-[var(--bg-2)] border-[var(--line)] shadow-xl",
    "bg-[var(--bg-3)] border-[var(--line)] shadow-2xl",
    "bg-[var(--bg-4)] border-[var(--line)] shadow-2xl",
  ];

  const handleCardClick = (index: number) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  return (
    <AppWindow title="Skills">
      <div className="relative w-full max-w-[340px] mx-auto pt-2 pb-16 min-h-[500px]">
        <p className="text-[13px] text-[var(--text-3)] mb-4 text-center">
          Tap any card to view detailed skill breakdown
        </p>

        <div className="relative h-[480px]">
          {PORTFOLIO_DATA.skillsCategories.map((cat, idx) => {
            const isExpanded = activeCardIndex === idx;
            const isAnyExpanded = activeCardIndex !== null;

            // Compute stacking offsets
            let yOffset = idx * 56;
            let zIndex = idx + 1;
            let scale = 1;

            if (isAnyExpanded) {
              if (isExpanded) {
                yOffset = 0;
                zIndex = 20;
                scale = 1.02;
              } else {
                // Non-active cards compress and move down
                yOffset = 240 + idx * 48;
                zIndex = idx;
                scale = 0.95;
              }
            }

            return (
              <motion.button
                key={cat.id}
                type="button"
                aria-expanded={isExpanded}
                layout
                onClick={() => handleCardClick(idx)}
                initial={false}
                animate={{
                  y: yOffset,
                  scale,
                  zIndex,
                }}
                transition={
                  reducedMotion ? reducedMotionTransition : springs.app
                }
                className={`absolute left-0 right-0 w-[338px] min-h-[210px] rounded-[22px] p-4 text-left cursor-pointer border focus-visible:outline-none transition-shadow ${
                  cardBgs[idx % cardBgs.length]
                } ${isExpanded ? "ring-2 ring-[var(--accent)]" : ""}`}
                style={{
                  transformOrigin: "top center",
                }}
              >
                {/* Card Top: Index & Title */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[14px] text-[var(--text-3)] tracking-wider">
                    {cat.number}
                  </span>
                  <span className="text-[12px] text-[var(--accent)] font-semibold tracking-wider uppercase">
                    {isExpanded ? "Expanded" : "Tap to open"}
                  </span>
                </div>

                <h3 className="text-[22px] font-semibold tracking-tight text-[var(--text-1)] mb-2">
                  {cat.title}
                </h3>

                {/* Card Body: Chip preview vs full chip list */}
                {isExpanded ? (
                  <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-xl bg-[var(--bg-1)] border border-[var(--line)] text-[13px] text-[var(--text-1)] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-[var(--text-2)] line-clamp-2 leading-relaxed">
                    {cat.summaryChipText}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </AppWindow>
  );
};
