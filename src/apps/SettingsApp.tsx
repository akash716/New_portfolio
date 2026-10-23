import React from "react";
import { AppWindow } from "../os/AppWindow";
import { useOS, ThemeMode } from "../os/OSContext";

export const SettingsApp: React.FC = () => {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    reducedMotion,
    setReducedMotion,
    recruiterFocus,
    setRecruiterFocus,
  } = useOS();

  return (
    <AppWindow title="Settings">
      <div className="space-y-6">
        {/* Appearance Section */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Appearance
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-medium text-[var(--text-1)]">
                Theme
              </span>
              <span className="text-[13px] text-[var(--text-2)] capitalize">
                {theme}
              </span>
            </div>

            {/* Segmented Control */}
            <div className="grid grid-cols-3 p-1 rounded-xl bg-[var(--bg-3)] gap-1">
              {(["auto", "light", "dark"] as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={(e) => setTheme(mode, e)}
                  className={`py-1.5 text-[13px] font-medium rounded-lg capitalize transition-all ${
                    theme === mode
                      ? "bg-[var(--bg-1)] text-[var(--text-1)] shadow-sm"
                      : "text-[var(--text-2)] hover:text-[var(--text-1)]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recruiter Focus Mode Toggle */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Recruiter Mode
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[15px] font-medium text-[var(--text-1)]">
                Recruiter Focus
              </div>
              <div className="text-[12px] text-[var(--text-2)] mt-0.5 max-w-[220px]">
                Prioritizes quick 30-second proof points and one-tap resume/email CTAs on the Home screen.
              </div>
            </div>
            {/* iOS Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={recruiterFocus}
              onClick={() => setRecruiterFocus(!recruiterFocus)}
              className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors cursor-pointer ${
                recruiterFocus ? "bg-[var(--accent)]" : "bg-[var(--bg-3)]"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform ${
                  recruiterFocus ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Motion Section */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Accessibility &amp; Motion
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] p-4 border border-[var(--line)] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[15px] font-medium text-[var(--text-1)]">
                Reduce Motion
              </div>
              <div className="text-[12px] text-[var(--text-2)] mt-0.5">
                Replaces spring physics with quiet cross-fades
              </div>
            </div>
            {/* iOS Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-[51px] h-[31px] rounded-full p-[2px] transition-colors cursor-pointer ${
                reducedMotion ? "bg-[var(--accent)]" : "bg-[var(--bg-3)]"
              }`}
            >
              <div
                className={`w-[27px] h-[27px] rounded-full bg-white shadow-md transform transition-transform ${
                  reducedMotion ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div>
          <div className="px-4 pb-2 text-[12px] font-semibold text-[var(--text-3)] uppercase tracking-wider">
            Language
          </div>
          <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className="w-full h-[56px] px-4 flex items-center justify-between text-left hover:bg-[var(--bg-3)] transition-colors"
            >
              <span className="text-[15px] font-medium text-[var(--text-1)]">
                English
              </span>
              {language === "en" && (
                <span className="text-[var(--accent)] font-semibold text-sm">
                  ✓
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className="w-full h-[56px] px-4 flex items-center justify-between text-left hover:bg-[var(--bg-3)] transition-colors font-hindi"
            >
              <span className="text-[15px] font-medium text-[var(--text-1)]">
                हिन्दी (Hindi)
              </span>
              {language === "hi" && (
                <span className="text-[var(--accent)] font-semibold text-sm font-ui">
                  ✓
                </span>
              )}
            </button>
          </div>
        </div>

        {/* OS Info */}
        <div className="text-center pt-4 text-[12px] text-[var(--text-3)] font-mono">
          Akash OS · Build 2026.10
        </div>
      </div>
    </AppWindow>
  );
};
