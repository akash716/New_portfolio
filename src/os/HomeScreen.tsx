import React from "react";
import { motion } from "motion/react";
import { useOS } from "./OSContext";
import { springs, reducedMotionTransition } from "./motion";
import {
  IconSearch,
  IconExperience,
  IconEducation,
  IconSkills,
  IconLinks,
  IconResume,
  IconContact,
  IconTargetFocus,
  IconSettings,
} from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const HomeScreen: React.FC = () => {
  const {
    openApp,
    openSpotlight,
    recruiterFocus,
    setRecruiterFocus,
    triggerIslandNotification,
    reducedMotion,
  } = useOS();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(PORTFOLIO_DATA.email);
    triggerIslandNotification("Email copied", "check");
  };

  return (
    <div
      className="relative w-full h-full pt-2 px-4 sm:px-6 pb-[128px] flex flex-col items-center select-none overflow-y-auto no-scrollbar"
    >
        <div className="w-full max-w-[338px] flex-1 flex flex-col items-center">
        {/* 1. Profile Widget */}
        <motion.div
          className="w-full min-h-[146px] ios-glass rounded-[22px] p-3 sm:p-4 flex flex-col justify-between text-left mb-4 shadow-sm"
        >
          <div className="flex min-w-0 items-start justify-between gap-2">
            <button
              type="button"
              onClick={() => openApp("about")}
              className="flex min-w-0 flex-1 items-center gap-3.5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="About Akash Patankar"
            >
              {/* Monogram AP (Depth Layer) */}
              <div className="w-[52px] h-[52px] rounded-[18px] bg-[var(--bg-2)] border border-[var(--line)] shadow-inner flex items-center justify-center font-display text-[22px] font-medium text-[var(--text-1)] tracking-tight shrink-0">
                {PORTFOLIO_DATA.monogram}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="font-display text-[21px] sm:text-[24px] font-normal leading-tight tracking-[-0.02em] text-[var(--text-1)] truncate">
                  {PORTFOLIO_DATA.name}
                </h1>
                <p className="text-[13px] sm:text-[14px] text-[var(--text-2)] font-normal tracking-tight truncate mt-0.5">
                  {PORTFOLIO_DATA.title}
                </p>
              </div>
            </button>

          </div>

          {/* Bottom row: Degree completion and location */}
          <div className="flex items-center justify-between gap-2 text-[12px] sm:text-[13px] border-t border-[var(--line)] pt-2.5">
            <span className="min-w-0 text-[var(--text-1)] font-medium">MCA · Completed Aug 2026</span>
            <span className="shrink-0 text-[var(--text-2)]">{PORTFOLIO_DATA.location}</span>
          </div>
        </motion.div>

        {/* Recruiter Focus Mode vs Standard Mode */}
        {recruiterFocus ? (
          /* Recruiter Focus 338x338 "In 30 seconds" widget */
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={reducedMotion ? reducedMotionTransition : springs.app}
            className="w-full min-h-[338px] ios-glass rounded-[22px] p-4 flex flex-col justify-between text-left mb-4 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                  Recruiter Focus · In 30 Seconds
                </span>
                <span className="text-[11px] text-[var(--text-2)] font-mono">
                  Verified
                </span>
              </div>

              <h2 className="text-[18px] font-display font-medium text-[var(--text-1)] leading-snug mb-3">
                Key Engineering Proof Points
              </h2>

              <ul className="space-y-2.5 text-[13px] text-[var(--text-2)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold text-xs mt-0.5">•</span>
                  <span>
                    <strong className="text-[var(--text-1)]">Full-Stack POS:</strong> Shipped live Point-of-Sale across Railway, Render &amp; Vercel; solved critical MySQL temp-table overflow.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold text-xs mt-0.5">•</span>
                  <span>
                    <strong className="text-[var(--text-1)]">1-Year Internship:</strong> Delivered production client web applications at WebWorks Solution across React.js, Node.js &amp; WordPress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold text-xs mt-0.5">•</span>
                  <span>
                    <strong className="text-[var(--text-1)]">Academic Track Record:</strong> MCA with 8.43 CGPA from Ramdeobaba University, Nagpur (Aug 2026).
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Pills */}
            <div className="flex items-center gap-2 pt-3 border-t border-[var(--line)] mt-3">
              <button
                type="button"
                onClick={() => openApp("resume")}
                className="flex-1 h-10 rounded-full bg-[var(--accent)] text-white text-[13px] font-medium flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-98 transition-all"
              >
                <IconResume size={16} />
                <span>Resume PDF</span>
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex-1 h-10 rounded-full ios-glass text-[var(--text-1)] text-[13px] font-medium flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-98 transition-all"
              >
                <IconContact size={16} />
                <span>Copy Email</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* 2. Two 158x158 widgets at y=250 */}
            <div className="w-full grid grid-cols-1 min-[340px]:grid-cols-2 gap-4 mb-4">
              {/* Widget 1: Latest */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.96 }}
                transition={springs.snappy}
                onClick={() => openApp("projects/vendi")}
                className="h-[144px] ios-glass rounded-[22px] p-3 flex flex-col justify-between text-left group cursor-pointer relative shadow-sm"
                aria-label="Latest Project Vendi POS"
              >
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="whitespace-nowrap text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wide">
                      Latest Project
                    </span>
                  </div>
                  <h3 className="whitespace-nowrap text-[18px] font-semibold tracking-tight text-[var(--text-1)] leading-snug">
                    Vendi POS
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] text-[var(--text-2)] leading-tight font-medium">
                    Live on Railway, Render, Vercel
                  </p>
                </div>
              </motion.button>

              {/* Widget 2: Experience */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.96 }}
                transition={springs.snappy}
                onClick={() => openApp("experience")}
                className="h-[144px] ios-glass rounded-[22px] p-3 flex flex-col justify-between text-left group cursor-pointer relative shadow-sm"
                aria-label="Experience at WebWorks Solution"
              >
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span className="whitespace-nowrap text-[10px] font-semibold text-[var(--text-1)] uppercase tracking-wide">
                      Experience
                    </span>
                  </div>
                  <h3 className="whitespace-nowrap text-[18px] font-semibold tracking-tight text-[var(--text-1)] leading-snug">
                    WebWorks
                  </h3>
                </div>

                <div>
                  <p className="text-[11px] text-[var(--text-2)] leading-tight font-medium">
                    1-year internship · Aug 2025 – Jul 2026
                  </p>
                </div>
              </motion.button>
            </div>

            {/* 3. Icon Row at y=434 */}
            <div className="w-full grid grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6">
              {/* Experience */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.92 }}
                transition={springs.snappy}
                onClick={() => openApp("experience")}
                className="flex min-w-0 w-full flex-col items-center group cursor-pointer focus-visible:outline-none"
                aria-label="Open Experience app"
              >
                <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all">
                  <IconExperience size={28} strokeWidth={1.75} />
                </div>
                <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-normal leading-tight text-[var(--text-1)] text-center tracking-tight mt-2">
                  Experience
                </span>
              </motion.button>

              {/* Education */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.92 }}
                transition={springs.snappy}
                onClick={() => openApp("education")}
                className="flex min-w-0 w-full flex-col items-center group cursor-pointer focus-visible:outline-none"
                aria-label="Open Education app"
              >
                <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all">
                  <IconEducation size={28} strokeWidth={1.75} />
                </div>
                <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-normal leading-tight text-[var(--text-1)] text-center tracking-tight mt-2">
                  Education
                </span>
              </motion.button>

              {/* Skills */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.92 }}
                transition={springs.snappy}
                onClick={() => openApp("skills")}
                className="flex min-w-0 w-full flex-col items-center group cursor-pointer focus-visible:outline-none"
                aria-label="Open Skills app"
              >
                <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all">
                  <IconSkills size={28} strokeWidth={1.75} />
                </div>
                <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-normal leading-tight text-[var(--text-1)] text-center tracking-tight mt-2">
                  Skills
                </span>
              </motion.button>

              {/* Links */}
              <motion.button
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.92 }}
                transition={springs.snappy}
                onClick={() => openApp("links")}
                className="flex min-w-0 w-full flex-col items-center group cursor-pointer focus-visible:outline-none"
                aria-label="Open Links app"
              >
                <div className="w-14 h-14 sm:w-[60px] sm:h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all">
                  <IconLinks size={28} strokeWidth={1.75} />
                </div>
                <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-normal leading-tight text-[var(--text-1)] text-center tracking-tight mt-2">
                  Links
                </span>
              </motion.button>
            </div>
          </>
        )}

        {/* 4. Search & Settings Glass Controls */}
        <div className="flex items-center gap-2 mt-auto z-20">
          <motion.button
            type="button"
            whileTap={reducedMotion ? {} : { scale: 0.94 }}
            transition={springs.snappy}
            onClick={openSpotlight}
            className="w-[84px] h-[36px] ios-glass rounded-full flex items-center justify-center gap-1.5 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer shadow-sm"
            aria-label="Open Spotlight search"
          >
            <IconSearch size={14} />
            <span className="text-[12px] font-medium tracking-tight">Search</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={reducedMotion ? {} : { scale: 0.94 }}
            transition={springs.snappy}
            onClick={() => setRecruiterFocus(!recruiterFocus)}
            className={`w-[36px] h-[36px] ios-glass rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              recruiterFocus ? "text-[var(--accent)]" : "text-[var(--text-2)] hover:text-[var(--text-1)]"
            }`}
            title="Toggle Recruiter Focus mode"
            aria-label="Toggle Recruiter Focus mode"
            aria-pressed={recruiterFocus}
          >
            <IconTargetFocus size={15} />
          </motion.button>

          <motion.button
            type="button"
            whileTap={reducedMotion ? {} : { scale: 0.94 }}
            transition={springs.snappy}
            onClick={() => openApp("settings")}
            className="w-[36px] h-[36px] ios-glass rounded-full flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer shadow-sm"
            title="Open Settings"
            aria-label="Open Settings"
          >
            <IconSettings size={15} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
