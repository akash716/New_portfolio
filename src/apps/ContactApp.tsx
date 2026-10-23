import React, { useState } from "react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { useOS } from "../os/OSContext";
import {
  IconChevronRight,
  IconClose,
  IconCheck,
  IconMail,
  IconLinkedIn,
  IconGitHub,
} from "../os/Icons";
import { motion, AnimatePresence } from "motion/react";
import { springs } from "../os/motion";

export const ContactApp: React.FC = () => {
  const { triggerIslandNotification } = useOS();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PORTFOLIO_DATA.email);
    setCopied(true);
    triggerIslandNotification("Email copied", "check");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PORTFOLIO_DATA.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setSheetOpen(false);
  };

  return (
    <AppWindow title="Contact">
      <div className="max-w-[360px] mx-auto space-y-6">
        <p className="text-[14.5px] text-[var(--text-2)] px-1 leading-relaxed">
          For opportunities and project inquiries, connect directly:
        </p>

        {/* Inset Grouped Rows with iOS Service Icons */}
        <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
          {/* Email Row */}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="w-full min-h-[64px] px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-3)] transition-colors text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
              {/* iOS Style Mail Icon Tile */}
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/15">
                <IconMail size={20} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[var(--text-1)] leading-snug">
                  Email
                </div>
                <div className="text-[13px] text-[var(--text-2)] truncate mt-0.5 font-normal">
                  {PORTFOLIO_DATA.email}
                </div>
              </div>
            </div>
            <IconChevronRight
              size={18}
              className="text-[var(--text-3)] group-hover:text-[var(--text-1)] shrink-0 transition-colors"
            />
          </button>

          {/* LinkedIn Row */}
          <a
            href={PORTFOLIO_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[64px] px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-3)] transition-colors text-left group"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
              {/* iOS Style LinkedIn Icon Tile */}
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#0A66C2] to-[#004182] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/15">
                <IconLinkedIn size={20} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[var(--text-1)] leading-snug">
                  LinkedIn
                </div>
                <div className="text-[13px] text-[var(--text-2)] truncate mt-0.5 font-normal">
                  akash-patankar-631410282
                </div>
              </div>
            </div>
            <IconChevronRight
              size={18}
              className="text-[var(--text-3)] group-hover:text-[var(--text-1)] shrink-0 transition-colors"
            />
          </a>

          {/* GitHub Row */}
          <a
            href={PORTFOLIO_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[64px] px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-3)] transition-colors text-left group"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
              {/* iOS Style GitHub Icon Tile */}
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#2D333B] to-[#1C2128] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/15">
                <IconGitHub size={20} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[var(--text-1)] leading-snug">
                  GitHub
                </div>
                <div className="text-[13px] text-[var(--text-2)] truncate mt-0.5 font-normal">
                  github.com/akash716
                </div>
              </div>
            </div>
            <IconChevronRight
              size={18}
              className="text-[var(--text-3)] group-hover:text-[var(--text-1)] shrink-0 transition-colors"
            />
          </a>
        </div>

        {/* Copy Email Fast Button */}
        <div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="w-full h-12 rounded-full ios-glass border border-[var(--line)] text-[14.5px] font-medium text-[var(--text-1)] flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <IconCheck size={18} strokeWidth={2.5} />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <IconMail size={18} />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Sheet Email Form */}
      <AnimatePresence>
        {sheetOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setSheetOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={springs.app}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[var(--bg-1)] rounded-t-[38px] p-6 border-t border-[var(--line)] shadow-2xl space-y-4"
            >
              {/* Sheet Drag Handle */}
              <div className="w-10 h-1 bg-[var(--line)] rounded-full mx-auto" />

              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-[var(--text-1)]">
                  Compose Email
                </h3>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-2)] flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)]"
                >
                  <IconClose size={16} />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-3">
                <div>
                  <label className="text-[12px] text-[var(--text-3)] font-medium block mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    disabled
                    value={PORTFOLIO_DATA.email}
                    className="w-full h-10 px-3.5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] text-[14px] text-[var(--text-2)]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[var(--text-3)] font-medium block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Role Opportunity / Inquiry"
                    className="w-full h-10 px-3.5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] text-[14px] text-[var(--text-1)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="text-[12px] text-[var(--text-3)] font-medium block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Akash, I'd like to discuss..."
                    className="w-full p-3.5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] text-[14px] text-[var(--text-1)] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-[var(--accent)] text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all"
                >
                  Send via Mail App
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppWindow>
  );
};
