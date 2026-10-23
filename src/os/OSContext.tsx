import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type ThemeMode = "auto" | "dark" | "light";
export type LanguageMode = "en" | "hi";

export interface IslandNotification {
  message: string;
  icon?: "check" | "available";
}

interface OSContextType {
  isLocked: boolean;
  unlock: () => void;
  lock: () => void;
  activeApp: string | null;
  openApp: (appId: string) => void;
  closeApp: () => void;
  isFolderOpen: boolean;
  openFolder: () => void;
  closeFolder: () => void;
  isSpotlightOpen: boolean;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  recruiterFocus: boolean;
  setRecruiterFocus: (val: boolean) => void;
  theme: ThemeMode;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: ThemeMode, event?: React.MouseEvent) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  islandNotification: IslandNotification | null;
  isIslandExpanded: boolean;
  triggerIslandNotification: (message: string, icon?: "check" | "available") => void;
  toggleIslandExpanded: () => void;
  isMobileDevice: boolean;
  firstHomeRender: boolean;
  markHomeRendered: () => void;
}

const OSContext = createContext<OSContextType | null>(null);

export const useOS = () => {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used within OSProvider");
  return ctx;
};

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hash check on initial load: skip lock if hash exists
  const initialHash = typeof window !== "undefined" ? window.location.hash : "";
  const hasInitialHash = initialHash.length > 1;

  const [isLocked, setIsLocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    if (hasInitialHash) return false;
    try {
      const unlockedThisSession = sessionStorage.getItem("akash_os_unlocked");
      return unlockedThisSession !== "true";
    } catch {
      return true;
    }
  });

  const [activeApp, setActiveApp] = useState<string | null>(() => {
    if (hasInitialHash) {
      const clean = initialHash.replace(/^#\/?/, "");
      return clean || null;
    }
    return null;
  });

  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [firstHomeRender, setFirstHomeRender] = useState(true);

  // Recruiter Focus
  const [recruiterFocus, setRecruiterFocusState] = useState<boolean>(() => {
    try {
      return localStorage.getItem("akash_os_focus") === "true";
    } catch {
      return false;
    }
  });

  // Theme
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem("akash_os_theme") as ThemeMode;
      return saved || "auto";
    } catch {
      return "auto";
    }
  });

  // Language
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    try {
      const saved = localStorage.getItem("akash_os_lang") as LanguageMode;
      return saved || "en";
    } catch {
      return "en";
    }
  });

  // Reduced motion
  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("akash_os_reduced_motion");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  // Island notification & state
  const [islandNotification, setIslandNotification] =
    useState<IslandNotification | null>(null);
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);

  // Device width check
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 640;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // System dark preference listener
  const [systemDark, setSystemDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const resolvedTheme: "dark" | "light" =
    theme === "auto" ? (systemDark ? "dark" : "light") : theme;

  // Apply resolved theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    const metaTheme = document.getElementById("meta-theme-color");
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        resolvedTheme === "light" ? "#EFEDE8" : "#0A0A0B"
      );
    }
  }, [resolvedTheme]);

  // Handle URL hash changes (Back button, external deep links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (hash) {
        setIsLocked(false);
        setIsFolderOpen(false);
        setIsSpotlightOpen(false);
        setActiveApp(hash);
      } else {
        setActiveApp(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const unlock = useCallback(() => {
    setIsLocked(false);
    try {
      sessionStorage.setItem("akash_os_unlocked", "true");
    } catch {}

    // Subtle vibration on unlock
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }

    // Dynamic Island greeting
    setTimeout(() => {
      triggerIslandNotification("Portfolio ready", "check");
    }, 400);
  }, []);

  const lock = useCallback(() => {
    setIsLocked(true);
    setActiveApp(null);
    setIsFolderOpen(false);
    setIsSpotlightOpen(false);
    if (window.location.hash) {
      history.replaceState(null, "", " ");
    }
  }, []);

  const openApp = useCallback((appId: string) => {
    setIsFolderOpen(false);
    setIsSpotlightOpen(false);
    setActiveApp(appId);
    window.location.hash = `#/${appId}`;

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
  }, []);

  const closeApp = useCallback(() => {
    setActiveApp(null);
    if (window.location.hash) {
      history.replaceState(null, "", " ");
    }
  }, []);

  const openFolder = useCallback(() => {
    setIsFolderOpen(true);
    setIsSpotlightOpen(false);
  }, []);

  const closeFolder = useCallback(() => {
    setIsFolderOpen(false);
  }, []);

  const openSpotlight = useCallback(() => {
    setIsSpotlightOpen(true);
    setIsFolderOpen(false);
  }, []);

  const closeSpotlight = useCallback(() => {
    setIsSpotlightOpen(false);
  }, []);

  const setRecruiterFocus = useCallback((val: boolean) => {
    setRecruiterFocusState(val);
    try {
      localStorage.setItem("akash_os_focus", String(val));
    } catch {}
  }, []);

  const setLanguage = useCallback((lang: LanguageMode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("akash_os_lang", lang);
    } catch {}
  }, []);

  const setReducedMotion = useCallback((val: boolean) => {
    setReducedMotionState(val);
    try {
      localStorage.setItem("akash_os_reduced_motion", String(val));
    } catch {}
  }, []);

  // Circular theme transition
  const setTheme = useCallback(
    (newTheme: ThemeMode, event?: React.MouseEvent) => {
      const applyTheme = () => {
        setThemeState(newTheme);
        try {
          localStorage.setItem("akash_os_theme", newTheme);
        } catch {}
      };

      // Check if View Transitions API is available and reducedMotion is false
      if (
        !reducedMotion &&
        event &&
        typeof document !== "undefined" &&
        "startViewTransition" in document
      ) {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = (document as any).startViewTransition(() => {
          applyTheme();
        });

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "cubic-bezier(0.32, 0.72, 0, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        applyTheme();
      }
    },
    [reducedMotion]
  );

  const triggerIslandNotification = useCallback(
    (message: string, icon?: "check" | "available") => {
      setIslandNotification({ message, icon });
      setIsIslandExpanded(false);

      // Auto-collapse after 2.2s
      const timer = setTimeout(() => {
        setIslandNotification(null);
      }, 2200);

      return () => clearTimeout(timer);
    },
    []
  );

  const toggleIslandExpanded = useCallback(() => {
    setIsIslandExpanded((prev) => !prev);
  }, []);

  const markHomeRendered = useCallback(() => {
    setFirstHomeRender(false);
  }, []);

  // Global keyboard shortcuts (Cmd+K for Spotlight, Esc to close/home)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSpotlightOpen) {
          closeSpotlight();
        } else {
          openSpotlight();
        }
      } else if (e.key === "Escape") {
        if (isSpotlightOpen) {
          closeSpotlight();
        } else if (isFolderOpen) {
          closeFolder();
        } else if (activeApp) {
          closeApp();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isSpotlightOpen,
    isFolderOpen,
    activeApp,
    openSpotlight,
    closeSpotlight,
    closeFolder,
    closeApp,
  ]);

  return (
    <OSContext.Provider
      value={{
        isLocked,
        unlock,
        lock,
        activeApp,
        openApp,
        closeApp,
        isFolderOpen,
        openFolder,
        closeFolder,
        isSpotlightOpen,
        openSpotlight,
        closeSpotlight,
        recruiterFocus,
        setRecruiterFocus,
        theme,
        resolvedTheme,
        setTheme,
        language,
        setLanguage,
        reducedMotion,
        setReducedMotion,
        islandNotification,
        isIslandExpanded,
        triggerIslandNotification,
        toggleIslandExpanded,
        isMobileDevice,
        firstHomeRender,
        markHomeRendered,
      }}
    >
      {children}
    </OSContext.Provider>
  );
};
