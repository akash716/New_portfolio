import React from "react";
import { AppWindow } from "../os/AppWindow";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { useOS } from "../os/OSContext";
import {
  IconChevronRight,
  IconGitHub,
  IconLinkedIn,
  IconResume,
  IconMail,
} from "../os/Icons";

export const LinksApp: React.FC = () => {
  const { openApp } = useOS();

  const links = [
    {
      title: "GitHub",
      url: PORTFOLIO_DATA.githubUrl,
      handle: "github.com/akash716",
      external: true,
      icon: <IconGitHub size={20} strokeWidth={2} />,
      badgeBg: "bg-gradient-to-br from-[#2D333B] to-[#1C2128]",
    },
    {
      title: "LinkedIn",
      url: PORTFOLIO_DATA.linkedinUrl,
      handle: "akash-patankar-631410282",
      external: true,
      icon: <IconLinkedIn size={20} strokeWidth={2} />,
      badgeBg: "bg-gradient-to-br from-[#0A66C2] to-[#004182]",
    },
    {
      title: "Resume Document",
      action: () => openApp("resume"),
      handle: "PDF Preview & Direct Download",
      external: false,
      icon: <IconResume size={20} strokeWidth={2} />,
      badgeBg: "bg-gradient-to-br from-[#E65100] to-[#BF360C]",
    },
    {
      title: "Email",
      action: () => openApp("contact"),
      handle: PORTFOLIO_DATA.email,
      external: false,
      icon: <IconMail size={20} strokeWidth={2} />,
      badgeBg: "bg-gradient-to-br from-[#1E88E5] to-[#1565C0]",
    },
  ];

  return (
    <AppWindow title="Links">
      <div className="max-w-[360px] mx-auto space-y-4">
        <p className="text-[14.5px] text-[var(--text-2)] px-1 leading-relaxed">
          Verified external accounts and documents:
        </p>

        <div className="bg-[var(--bg-2)] rounded-[20px] divide-y divide-[var(--line)] border border-[var(--line)] shadow-sm overflow-hidden">
          {links.map((link, idx) => {
            if (link.external) {
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[64px] px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-3)] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                    <div
                      className={`w-10 h-10 rounded-[12px] ${link.badgeBg} text-white flex items-center justify-center shrink-0 shadow-sm border border-white/15`}
                    >
                      {link.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold text-[var(--text-1)] leading-snug">
                        {link.title}
                      </div>
                      <div className="text-[13px] text-[var(--text-2)] truncate mt-0.5 font-normal">
                        {link.handle}
                      </div>
                    </div>
                  </div>
                  <IconChevronRight
                    size={18}
                    className="text-[var(--text-3)] group-hover:text-[var(--text-1)] shrink-0 transition-colors"
                  />
                </a>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={link.action}
                className="w-full min-h-[64px] px-4 py-3 flex items-center justify-between hover:bg-[var(--bg-3)] transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
                  <div
                    className={`w-10 h-10 rounded-[12px] ${link.badgeBg} text-white flex items-center justify-center shrink-0 shadow-sm border border-white/15`}
                  >
                    {link.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-[var(--text-1)] leading-snug">
                      {link.title}
                    </div>
                    <div className="text-[13px] text-[var(--text-2)] truncate mt-0.5 font-normal">
                      {link.handle}
                    </div>
                  </div>
                </div>
                <IconChevronRight
                  size={18}
                  className="text-[var(--text-3)] group-hover:text-[var(--text-1)] shrink-0 transition-colors"
                />
              </button>
            );
          })}
        </div>
      </div>
    </AppWindow>
  );
};
