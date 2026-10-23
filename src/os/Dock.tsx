import React from "react";
import { motion } from "motion/react";
import { useOS } from "./OSContext";
import { springs } from "./motion";
import { IconAbout, IconProjects, IconResume, IconContact } from "./Icons";

interface DockAppItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  isFolder?: boolean;
}

export const Dock: React.FC = () => {
  const { openApp, openFolder, reducedMotion } = useOS();

  const dockApps: DockAppItem[] = [
    {
      id: "about",
      name: "About",
      icon: <IconAbout size={28} strokeWidth={1.75} />,
    },
    {
      id: "projects-folder",
      name: "Projects",
      icon: <IconProjects size={28} strokeWidth={1.75} />,
      isFolder: true,
    },
    {
      id: "resume",
      name: "Resume",
      icon: <IconResume size={28} strokeWidth={1.75} />,
    },
    {
      id: "contact",
      name: "Contact",
      icon: <IconContact size={28} strokeWidth={1.75} />,
    },
  ];

  const handleAppClick = (app: DockAppItem) => {
    if (app.isFolder) {
      openFolder();
    } else {
      openApp(app.id);
    }
  };

  return (
    <nav
      aria-label="Dock"
      className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[364px] h-[88px] ios-glass rounded-[38px] px-2 sm:px-3.5 flex items-center justify-around z-30 select-none"
    >
      {dockApps.map((app) => (
        <motion.button
          key={app.id}
          type="button"
          whileTap={reducedMotion ? {} : { scale: 0.92 }}
          transition={springs.snappy}
          onClick={() => handleAppClick(app)}
          className="flex flex-col items-center group cursor-pointer focus-visible:outline-none"
          aria-label={app.name}
        >
          <div className="w-[60px] h-[60px] ios-icon-tile flex items-center justify-center text-[var(--text-1)] group-hover:brightness-110 transition-all">
            {app.icon}
          </div>
        </motion.button>
      ))}
    </nav>
  );
};
