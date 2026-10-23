import React, { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OSProvider, useOS } from "./os/OSContext";
import { StatusBar } from "./os/StatusBar";
import { DynamicIsland } from "./os/DynamicIsland";
import { LockScreen } from "./os/LockScreen";
import { HomeScreen } from "./os/HomeScreen";
import { Dock } from "./os/Dock";
import { HomeIndicator } from "./os/HomeIndicator";
import { ProjectsFolder } from "./os/ProjectsFolder";
import { Spotlight } from "./os/Spotlight";
import { BootLoader } from "./os/BootLoader";
import { PORTFOLIO_DATA } from "./data/portfolio";

const AboutApp = lazy(() => import("./apps/AboutApp").then((m) => ({ default: m.AboutApp })));
const ExperienceApp = lazy(() => import("./apps/ExperienceApp").then((m) => ({ default: m.ExperienceApp })));
const EducationApp = lazy(() => import("./apps/EducationApp").then((m) => ({ default: m.EducationApp })));
const SkillsApp = lazy(() => import("./apps/SkillsApp").then((m) => ({ default: m.SkillsApp })));
const ResumeApp = lazy(() => import("./apps/ResumeApp").then((m) => ({ default: m.ResumeApp })));
const ContactApp = lazy(() => import("./apps/ContactApp").then((m) => ({ default: m.ContactApp })));
const LinksApp = lazy(() => import("./apps/LinksApp").then((m) => ({ default: m.LinksApp })));
const SettingsApp = lazy(() => import("./apps/SettingsApp").then((m) => ({ default: m.SettingsApp })));
const ProjectDetailApp = lazy(() => import("./apps/ProjectDetailApp").then((m) => ({ default: m.ProjectDetailApp })));

const DeviceViewport: React.FC = () => {
  const {
    isLocked,
    activeApp,
  } = useOS();

  // Boot sequence state
  const [isBooting, setIsBooting] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    // Skip if URL has a hash route directly
    if (window.location.hash.length > 1) return false;
    try {
      return sessionStorage.getItem("akash_os_booted") !== "true";
    } catch {
      return false;
    }
  });

  const handleBootComplete = () => {
    setIsBooting(false);
    try {
      sessionStorage.setItem("akash_os_booted", "true");
    } catch {}
  };

  // Find project if route matches 'projects/:slug'
  const projectMatch = activeApp?.startsWith("projects/")
    ? PORTFOLIO_DATA.projects.find(
        (p) => p.slug === activeApp.replace("projects/", "")
      )
    : null;

  const renderActiveApp = () => {
    if (!activeApp) return null;

    if (projectMatch) {
      return <ProjectDetailApp project={projectMatch} />;
    }

    switch (activeApp) {
      case "about":
        return <AboutApp />;
      case "experience":
        return <ExperienceApp />;
      case "education":
        return <EducationApp />;
      case "skills":
        return <SkillsApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      case "links":
        return <LinksApp />;
      case "settings":
        return <SettingsApp />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col os-wallpaper overflow-hidden select-none">
      {/* BootLoader Sequence */}
      {isBooting && <BootLoader onBootComplete={handleBootComplete} />}

      {/* Dynamic Island (Desktop frame only) */}
      <DynamicIsland />

      {/* iOS Status Bar */}
      <StatusBar />

      {/* Main OS Viewport Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* Home Screen Layer */}
        <motion.div
          animate={
            activeApp
              ? { scale: 0.94, opacity: 0.4, filter: "blur(8px)" }
              : { scale: 1, opacity: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="w-full h-full"
        >
          <HomeScreen />
          <Dock />
          <HomeIndicator />
        </motion.div>

        {/* Lock Screen Layer */}
        <AnimatePresence>
          {!isBooting && isLocked && <LockScreen />}
        </AnimatePresence>

        {/* Active App Layer */}
        <Suspense
          fallback={
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--bg-1)] text-sm text-[var(--text-2)]" role="status">
              Opening app…
            </div>
          }
        >
          <AnimatePresence>{activeApp && renderActiveApp()}</AnimatePresence>
        </Suspense>

        {/* Projects Folder Modal Layer */}
        <ProjectsFolder />

        {/* Spotlight Modal Layer */}
        <Spotlight />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <OSProvider>
      <AppShell />
    </OSProvider>
  );
}

const AppShell: React.FC = () => {
  const { isMobileDevice, openSpotlight, triggerIslandNotification } =
    useOS();

  const handleDownloadDirectResume = () => {
    const link = document.createElement("a");
    link.href = "/Akash_Patankar_Resume.pdf";
    link.download = "Akash_Patankar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerIslandNotification("Resume downloaded", "check");
  };

  return (
    <main
      aria-label="Akash Patankar Portfolio"
      className="w-screen h-[100dvh] flex items-center justify-center bg-[var(--bg-0)] overflow-hidden relative select-none font-ui"
    >
      {/* Desktop Ambient Background */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors"
        style={{ background: "radial-gradient(ellipse at center, var(--bg-1), var(--bg-0) 72%)" }}
      />

      {/* Mobile devices: 100% full-bleed without device bezel */}
      {isMobileDevice ? (
        <div className="w-full h-full relative overflow-hidden">
          <DeviceViewport />
        </div>
      ) : (
        /* Desktop & Tablets: Centered iPhone 390x844 frame */
        <div className="relative z-10 flex flex-col items-center">
          {/* External Desktop Hints */}
          <div className="w-[390px] mb-4 px-4 flex items-center justify-between text-[13px] text-[var(--text-3)] font-mono select-none">
            <button
              type="button"
              onClick={handleDownloadDirectResume}
              className="text-[var(--text-2)] hover:text-[var(--text-1)] hover:underline cursor-pointer transition-colors"
            >
              ↓ Download resume
            </button>
            <button
              type="button"
              onClick={openSpotlight}
              className="hover:text-[var(--text-1)] cursor-pointer transition-colors"
            >
              ⌘K to search
            </button>
          </div>

          {/* iPhone 16 Pro Style Hardware Chassis (390x844 inner canvas) */}
          <div
            className="relative rounded-[55px] p-[10px] bg-[#121214] ring-1 ring-white/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden"
            style={{
              width: "min(390px, 90vw, 42.46vh)",
              aspectRatio: "390 / 844",
            }}
          >
            {/* Screen Inner Bezel */}
            <div className="relative w-full h-full rounded-[45px] overflow-hidden bg-black shadow-inner">
              <DeviceViewport />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
