import React, { useState } from "react";
import { AppWindow } from "../os/AppWindow";
import { ProjectItem } from "../data/portfolio";
import { useOS } from "../os/OSContext";
import {
  IconClose,
  IconVendiPOS,
  IconCar,
  IconDocConvert,
  IconTextQA,
  IconStorageRack,
  IconMediaFilm,
} from "../os/Icons";

interface ProjectDetailAppProps {
  project: ProjectItem;
}

export const ProjectDetailApp: React.FC<ProjectDetailAppProps> = ({ project }) => {
  const { closeApp } = useOS();
  const [interactMode, setInteractMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  const glyphMap: Record<string, React.ReactNode> = {
    vendi: <IconVendiPOS size={40} strokeWidth={1.5} />,
    sarthii: <IconCar size={40} strokeWidth={1.5} />,
    "doc-converter": <IconDocConvert size={40} strokeWidth={1.5} />,
    "text-qa": <IconTextQA size={40} strokeWidth={1.5} />,
    goswami: <IconStorageRack size={40} strokeWidth={1.5} />,
    hangover: <IconMediaFilm size={40} strokeWidth={1.5} />,
  };

  const closeButton = (
    <button
      type="button"
      onClick={closeApp}
      className="w-9 h-9 rounded-full ios-glass flex items-center justify-center text-[var(--text-1)] hover:brightness-110 active:scale-95 transition-all shadow-md"
      aria-label="Close project"
    >
      <IconClose size={18} />
    </button>
  );

  return (
    <AppWindow
      title={project.shortName}
      parentTitle="Projects"
      rightAction={closeButton}
      noPadding
    >
      <div className="pb-28">
        {/* 1. Cover 390x280 (High-Fidelity Project Screenshot or Designed Frame) */}
        <div className="relative w-full h-[240px] sm:h-[280px] bg-[var(--bg-2)] border-b border-[var(--line)] overflow-hidden flex flex-col justify-between">
          {project.coverImage && !imageError ? (
            <div className="relative w-full h-full group">
              <img
                src={project.coverImage}
                alt={`${project.name} Interface Screenshot`}
                referrerPolicy="no-referrer"
                decoding="async"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Subtle top & bottom scrim for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

              {/* Status Badge Tag */}
              <div className="absolute top-3 left-3 z-10">
                <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/90 font-mono flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>{project.status.split(" [")[0]}</span>
                </div>
              </div>

              {/* Floating interact button if live demo */}
              {project.liveUrl && (
                <div className="absolute bottom-3 right-3 z-10">
                  <button
                    type="button"
                    onClick={() => setInteractMode(!interactMode)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--accent)] text-white shadow-lg active:scale-95 transition-all"
                  >
                    {interactMode ? "Done" : "Interact"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 flex flex-col justify-between h-full">
              {/* Simulated Browser Frame Header */}
              <div className="w-full flex items-center justify-between pb-2 border-b border-[var(--line)]/50 text-[11px] text-[var(--text-3)] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
                </div>
                <div className="px-3 py-0.5 rounded-full bg-[var(--bg-1)] border border-[var(--line)] text-[10px] text-[var(--text-2)] truncate max-w-[200px]">
                  {project.status.split(" [")[0]}
                </div>
                <div className="w-8" />
              </div>

              {/* Center Graphic */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-[22px] bg-[var(--bg-3)] border border-dashed border-[var(--line)] flex items-center justify-center text-[var(--text-1)] mb-3 shadow-inner">
                  {glyphMap[project.slug] || <IconVendiPOS size={32} />}
                </div>
                <span className="text-[13px] font-medium text-[var(--text-2)] tracking-tight">
                  {project.name}
                </span>
                <span className="text-[11px] text-[var(--text-3)] font-mono mt-0.5">
                  Production Architecture
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="px-4 pt-5 space-y-6">
          {/* 2. Title, Subtitle, Tech Chips */}
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-bold font-display tracking-tight text-[var(--text-1)] leading-tight">
              {project.name}
            </h1>
            <p className="text-[14.5px] text-[var(--text-2)] mt-1 font-normal leading-snug">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-[var(--bg-2)] border border-[var(--line)] text-[12px] font-medium text-[var(--text-1)] font-mono shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3. App Store-style Information Row: Role · Year · Stack · Status */}
          <div className="w-full bg-[var(--bg-2)] rounded-[18px] p-4 border border-[var(--line)] grid grid-cols-2 gap-4 text-left shadow-sm">
            <div>
              <div className="text-[11px] text-[var(--text-3)] uppercase tracking-wider font-medium">
                Role
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-1)] mt-0.5 truncate">
                {project.role}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-3)] uppercase tracking-wider font-medium">
                Year
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-1)] mt-0.5">
                {project.year}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-3)] uppercase tracking-wider font-medium">
                Primary Stack
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-1)] mt-0.5 truncate">
                {project.stack.slice(0, 2).join(", ")}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-3)] uppercase tracking-wider font-medium">
                Status
              </div>
              <div className="text-[14px] font-semibold text-[var(--text-1)] mt-0.5 truncate">
                {project.status.split(" ")[0]}
              </div>
            </div>
          </div>

          {/* 4. Highlighted Problem → Fix Card (for Vendi POS) */}
          {project.problemFix && (
            <div className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--accent)]/40 relative overflow-hidden shadow-sm">
              <div className="text-[12px] font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span>Production Optimization (Root Cause &amp; Resolution)</span>
              </div>
              <div className="space-y-2 text-[14px] leading-relaxed">
                <div>
                  <span className="text-[var(--text-2)] font-semibold text-xs block mb-0.5">
                    Problem Identified:
                  </span>
                  <p className="text-[var(--text-1)] text-[13.5px]">
                    {project.problemFix.problem}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--line)]">
                  <span className="text-[var(--accent)] font-semibold text-xs block mb-0.5">
                    Engineered Fix:
                  </span>
                  <p className="text-[var(--text-1)] text-[13.5px]">
                    {project.problemFix.fix}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. Inset Grouped Lists: What It Is, What I Did */}
          <div className="space-y-4">
            <div>
              <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
                What It Is
              </div>
              <div className="bg-[var(--bg-2)] rounded-[18px] p-4 border border-[var(--line)] text-[14px] leading-relaxed text-[var(--text-1)] shadow-sm">
                {project.whatItIs}
              </div>
            </div>

            <div>
              <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
                What I Did
              </div>
              <div className="bg-[var(--bg-2)] rounded-[18px] divide-y divide-[var(--line)] border border-[var(--line)] overflow-hidden shadow-sm">
                {project.whatIDid.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[var(--bg-3)] text-[var(--accent)] text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-[13.5px] text-[var(--text-1)] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Horizontal Snap-Scroll Screenshot Strip */}
          <div>
            <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
              Interface Perspectives
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
              {project.coverImage ? (
                <>
                  <div className="w-[260px] h-[160px] bg-[var(--bg-2)] rounded-[18px] border border-[var(--line)] overflow-hidden shrink-0 snap-start shadow-md relative group">
                    <img
                      src={project.coverImage}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[11px] text-white font-mono">
                        View 01 · Primary Layout
                      </span>
                    </div>
                  </div>

                  {project.secondaryImage ? (
                    <div className="w-[260px] h-[160px] bg-[var(--bg-2)] rounded-[18px] border border-[var(--line)] overflow-hidden shrink-0 snap-start shadow-md relative group">
                      <img
                        src={project.secondaryImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[11px] text-white font-mono">
                          View 02 · Architecture &amp; Data
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[260px] h-[160px] bg-[var(--bg-2)] rounded-[18px] border border-[var(--line)] p-4 flex flex-col justify-between shrink-0 snap-start shadow-sm">
                      <span className="text-[11px] text-[var(--text-3)] font-mono">
                        View 02 · Relational Flow
                      </span>
                      <div className="text-center text-[13px] text-[var(--text-2)]">
                        Backend Schema &amp; Endpoint Pipeline
                      </div>
                      <div className="h-1 bg-[var(--line)] rounded-full" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-[260px] h-[160px] bg-[var(--bg-2)] rounded-[18px] border border-[var(--line)] p-4 flex flex-col justify-between shrink-0 snap-start shadow-sm">
                    <span className="text-[11px] text-[var(--text-3)] font-mono">
                      View 01 · Primary Layout
                    </span>
                    <div className="text-center text-[13px] text-[var(--text-2)]">
                      {project.shortName} Core View
                    </div>
                    <div className="h-1 bg-[var(--line)] rounded-full" />
                  </div>

                  <div className="w-[260px] h-[160px] bg-[var(--bg-2)] rounded-[18px] border border-[var(--line)] p-4 flex flex-col justify-between shrink-0 snap-start shadow-sm">
                    <span className="text-[11px] text-[var(--text-3)] font-mono">
                      View 02 · Relational Flow
                    </span>
                    <div className="text-center text-[13px] text-[var(--text-2)]">
                      Data &amp; API Integration Flow
                    </div>
                    <div className="h-1 bg-[var(--line)] rounded-full" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 7. Action Buttons (Rendered only if confirmed URLs provided) */}
          {(project.liveUrl || project.sourceUrl) && (
            <div className="pt-2 flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 rounded-full bg-[var(--accent)] text-white text-[14px] font-medium flex items-center justify-center shadow-lg hover:brightness-110 active:scale-98 transition-all"
                >
                  Open Live Site
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-11 rounded-full ios-glass border border-[var(--line)] text-[var(--text-1)] text-[14px] font-medium flex items-center justify-center hover:brightness-105 active:scale-98 transition-all"
                >
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
};
