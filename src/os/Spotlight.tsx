import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "./OSContext";
import { springs, reducedMotionTransition } from "./motion";
import { IconSearch, IconClose, IconChevronRight } from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const Spotlight: React.FC = () => {
  const { isSpotlightOpen, closeSpotlight, openApp, reducedMotion } = useOS();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSpotlightOpen]);

  if (!isSpotlightOpen) return null;

  const normalized = query.trim().toLowerCase();

  // Search categories
  const apps = [
    { id: "about", name: "About", detail: "Bio, Education, Languages" },
    { id: "experience", name: "Experience", detail: "WebWorks Solution Intern" },
    { id: "education", name: "Education", detail: "MCA, B.Com, HSC, SSC" },
    { id: "skills", name: "Skills", detail: "Languages, Frontend, Backend, Tools" },
    { id: "resume", name: "Resume", detail: "PDF Preview & Download" },
    { id: "contact", name: "Contact", detail: "Email, LinkedIn, GitHub" },
    { id: "links", name: "Links", detail: "Direct Profile Links" },
    { id: "settings", name: "Settings", detail: "Theme, Language, Motion" },
  ].filter((a) =>
    normalized === ""
      ? true
      : a.name.toLowerCase().includes(normalized) ||
        a.detail.toLowerCase().includes(normalized)
  );

  const projects = PORTFOLIO_DATA.projects.filter((p) =>
    normalized === ""
      ? true
      : p.name.toLowerCase().includes(normalized) ||
        p.subtitle.toLowerCase().includes(normalized) ||
        p.stack.some((s) => s.toLowerCase().includes(normalized))
  );

  const matchedSkills: { catTitle: string; skill: string }[] = [];
  if (normalized !== "") {
    PORTFOLIO_DATA.skillsCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        if (skill.toLowerCase().includes(normalized)) {
          matchedSkills.push({ catTitle: cat.title, skill });
        }
      });
    });
  }

  // Combined results for keyboard navigation
  const allResults = [
    ...apps.map((a) => ({ type: "app", id: a.id, title: a.name, desc: a.detail })),
    ...projects.map((p) => ({
      type: "project",
      id: `projects/${p.slug}`,
      title: p.shortName,
      desc: p.subtitle,
    })),
    ...matchedSkills.map((s) => ({
      type: "skill",
      id: "skills",
      title: s.skill,
      desc: `Category: ${s.catTitle}`,
    })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(allResults.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + allResults.length) % Math.max(allResults.length, 1)
      );
    } else if (e.key === "Enter" && allResults[selectedIndex]) {
      e.preventDefault();
      openApp(allResults[selectedIndex].id);
      closeSpotlight();
    }
  };

  return (
    <AnimatePresence>
      <div
        className="absolute inset-0 z-50 flex flex-col items-center pt-16 px-4 bg-black/50 backdrop-blur-md select-none"
        onClick={closeSpotlight}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={reducedMotion ? reducedMotionTransition : springs.popover}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[358px] ios-glass rounded-[28px] overflow-hidden shadow-2xl flex flex-col max-h-[580px]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-[var(--line)]">
            <IconSearch size={20} className="text-[var(--text-2)] mr-2.5 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search apps, projects, skills..."
              className="w-full bg-transparent text-[17px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="w-5 h-5 rounded-full bg-[var(--bg-3)] flex items-center justify-center text-[var(--text-2)] ml-2"
                aria-label="Clear search"
              >
                <IconClose size={12} />
              </button>
            )}
          </div>

          {/* Results Area */}
          <div className="overflow-y-auto no-scrollbar py-2 divide-y divide-[var(--line)]">
            {allResults.length === 0 ? (
              <div className="py-8 text-center text-[var(--text-3)] text-sm">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <>
                {/* Apps Group */}
                {apps.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1 text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
                      Apps
                    </div>
                    {apps.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          openApp(item.id);
                          closeSpotlight();
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[var(--bg-2)] transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="text-[15px] font-medium text-[var(--text-1)]">
                            {item.name}
                          </div>
                          <div className="text-[12px] text-[var(--text-2)] truncate">
                            {item.detail}
                          </div>
                        </div>
                        <IconChevronRight
                          size={16}
                          className="text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Projects Group */}
                {projects.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1 text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
                      Projects
                    </div>
                    {projects.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          openApp(`projects/${item.slug}`);
                          closeSpotlight();
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[var(--bg-2)] transition-colors group cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-[15px] font-medium text-[var(--text-1)] truncate">
                            {item.name}
                          </div>
                          <div className="text-[12px] text-[var(--text-2)] truncate">
                            {item.subtitle}
                          </div>
                        </div>
                        <IconChevronRight
                          size={16}
                          className="text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Skills Group */}
                {matchedSkills.length > 0 && (
                  <div className="py-2">
                    <div className="px-4 py-1 text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
                      Skills
                    </div>
                    {matchedSkills.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          openApp("skills");
                          closeSpotlight();
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-[var(--bg-2)] transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="text-[15px] font-medium text-[var(--text-1)]">
                            {item.skill}
                          </div>
                          <div className="text-[12px] text-[var(--text-2)]">
                            {item.catTitle}
                          </div>
                        </div>
                        <IconChevronRight
                          size={16}
                          className="text-[var(--text-3)] group-hover:text-[var(--text-1)] transition-colors"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
