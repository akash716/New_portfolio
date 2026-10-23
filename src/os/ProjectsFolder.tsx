import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOS } from "./OSContext";
import { springs, reducedMotionTransition } from "./motion";
import {
  IconClose,
  IconVendiPOS,
  IconCar,
  IconDocConvert,
  IconTextQA,
  IconStorageRack,
  IconMediaFilm,
} from "./Icons";
import { PORTFOLIO_DATA } from "../data/portfolio";

export const ProjectsFolder: React.FC = () => {
  const { isFolderOpen, closeFolder, openApp, reducedMotion } = useOS();

  if (!isFolderOpen) return null;

  const projectIcons: Record<string, React.ReactNode> = {
    vendi: <IconVendiPOS size={28} strokeWidth={1.75} />,
    sarthii: <IconCar size={28} strokeWidth={1.75} />,
    "doc-converter": <IconDocConvert size={28} strokeWidth={1.75} />,
    "text-qa": <IconTextQA size={28} strokeWidth={1.75} />,
    goswami: <IconStorageRack size={28} strokeWidth={1.75} />,
    hangover: <IconMediaFilm size={28} strokeWidth={1.75} />,
  };

  const handleOpenProject = (slug: string) => {
    openApp(`projects/${slug}`);
  };

  return (
    <AnimatePresence>
      <div
        className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md select-none"
        onClick={closeFolder}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={reducedMotion ? reducedMotionTransition : springs.popover}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[320px] ios-glass rounded-[32px] p-5 sm:p-6 shadow-2xl relative"
        >
          {/* Top Title & Close Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[19px] font-semibold tracking-tight text-[var(--text-1)]">
              Projects
            </h2>
            <button
              type="button"
              onClick={closeFolder}
              className="w-8 h-8 rounded-full bg-[var(--bg-2)] flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] active:scale-95 transition-all"
              aria-label="Close folder"
            >
              <IconClose size={16} />
            </button>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <motion.button
                key={project.id}
                type="button"
                whileTap={reducedMotion ? {} : { scale: 0.92 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : idx * 0.02,
                  duration: 0.25,
                }}
                onClick={() => handleOpenProject(project.slug)}
                className="flex flex-col items-center group cursor-pointer focus-visible:outline-none w-[72px]"
                aria-label={`Open project ${project.name}`}
              >
                <div className="w-[60px] h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all relative overflow-hidden">
                  {project.coverImage ? (
                    <>
                      <img
                        src={project.coverImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </>
                  ) : (
                    projectIcons[project.slug] || (
                      <span className="text-xs font-mono font-bold">
                        {project.shortName.slice(0, 2)}
                      </span>
                    )
                  )}
                </div>
                <span className="text-[11px] font-normal text-[var(--text-1)] text-center tracking-tight truncate w-full mt-2 leading-tight">
                  {project.shortName}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
