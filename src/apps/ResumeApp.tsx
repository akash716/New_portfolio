import React, { useState } from "react";
import { AppWindow } from "../os/AppWindow";
import { useOS } from "../os/OSContext";
import { IconShare, IconDownload, IconCheck } from "../os/Icons";

export const ResumeApp: React.FC = () => {
  const { triggerIslandNotification } = useOS();
  const [downloaded, setDownloaded] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Akash Patankar – Resume",
          text: "Resume of Akash Patankar, Full-Stack Web Developer",
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard?.writeText(window.location.href);
      triggerIslandNotification("Link copied", "check");
    }
  };

  const handleDownload = () => {
    setDownloaded(true);
    triggerIslandNotification("Resume downloaded", "check");

    const link = document.createElement("a");
    link.href = "/Akash_Patankar_Resume.pdf";
    link.download = "Akash_Patankar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareButton = (
    <button
      type="button"
      onClick={handleShare}
      className="p-2 rounded-full hover:bg-[var(--bg-2)] text-[var(--accent)] transition-colors"
      aria-label="Share resume"
      title="Share"
    >
      <IconShare size={20} />
    </button>
  );

  return (
    <AppWindow title="Resume" rightAction={shareButton}>
      <div className="flex flex-col items-center max-w-[360px] mx-auto pb-12">
        {/* Top Download Accent Pill (Sticky/Prominent) */}
        <div className="w-full mb-4 sticky top-0 z-20 pt-1">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full h-12 rounded-full bg-[var(--accent)] text-white text-[15px] font-medium flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            {downloaded ? (
              <>
                <IconCheck size={18} strokeWidth={2.5} />
                <span>Resume Downloaded (PDF)</span>
              </>
            ) : (
              <>
                <IconDownload size={18} strokeWidth={2.2} />
                <span>Download Resume (PDF)</span>
              </>
            )}
          </button>
        </div>

        {/* Paper Document Preview Card (Faithful to actual PDF) */}
        <div className="w-full bg-[#FFFFFF] text-[#121212] rounded-[16px] border border-[var(--line)] shadow-2xl p-4 sm:p-5 text-left text-[11px] select-text font-ui leading-normal">
          {/* Header */}
          <div className="pb-2">
            <h1 className="text-[17px] font-bold text-[#111111] uppercase tracking-tight">
              AKASH PATANKAR
            </h1>
            <p className="text-[11px] text-[#1F5F99] font-medium mt-0.5">
              Full-Stack Web Developer (React.js / Node.js)
            </p>
            <div className="text-[9px] text-[#444444] mt-1 flex flex-wrap items-center gap-1 leading-tight">
              <span>Bhopal, MP</span>
              <span>|</span>
              <span>8827439284</span>
              <span>|</span>
              <span className="text-[#1F5F99]">akashpatankar987@gmail.com</span>
              <span>|</span>
              <span>linkedin.com/in/akash-patankar-631410282</span>
              <span>|</span>
              <span>github.com/akash716</span>
              <span className="ml-1 px-1.5 py-0.5 text-[8px] bg-[#1F5F99] text-white rounded font-bold">
                Portfolio
              </span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-1 mb-2">
              Professional Summary
            </div>
            <p className="text-[9.5px] text-[#222222] leading-[1.35]">
              Full-stack web developer with hands-on experience shipping production React.js and Node.js applications, including a live POS system deployed across 3 hosting platforms. Completed a 1-year web development internship at WebWorks Solution (Aug 2025 - Jul 2026), delivering full-stack and WordPress-based projects across branding, retail, and media industries. Comfortable owning a project end-to-end - frontend, backend, MySQL database design, and deployment - with a strong record of debugging real production issues.
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-1 mb-2">
              Technical Skills
            </div>
            <ul className="text-[9.5px] text-[#222222] space-y-0.5 leading-[1.35]">
              <li>
                <span className="font-bold">• Languages:</span> JavaScript, Java, SQL, HTML5, CSS3
              </li>
              <li>
                <span className="font-bold">• Frontend:</span> React.js, Vite, Responsive/Cross-browser UI, GSAP, REST API integration
              </li>
              <li>
                <span className="font-bold">• Backend:</span> Node.js, Express, REST APIs, server-side file processing
              </li>
              <li>
                <span className="font-bold">• Databases:</span> MySQL, SQL, XAMPP, database migration and debugging
              </li>
              <li>
                <span className="font-bold">• Tools and Platforms:</span> Git, GitHub, VS Code, Vercel, Railway, Render, Cloudinary, Chrome Extension APIs, OpenAI API
              </li>
              <li>
                <span className="font-bold">• Other:</span> WordPress and Elementor client-site development
              </li>
            </ul>
          </div>

          {/* Section: Experience */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-1 mb-2">
              Experience
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-[10px] text-[#111111]">
                  Full-Stack Developer Intern, WebWorks Solution
                </span>
                <span className="italic text-[9px] text-[#555555]">
                  Aug 2025 - Jul 2026
                </span>
              </div>
              <div className="italic text-[9px] text-[#555555] mb-1">
                Mumbai, India
              </div>
              <ul className="text-[9px] text-[#222222] space-y-1 leading-[1.3]">
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>
                    Delivered full-stack and WordPress-based websites across 3 industries - branding, retail, and media - including Vendi Chocolates, Go Sarthii, Goswami Storage Racks, and Hangover Media
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>
                    Designed, built, and deployed client applications end-to-end across 3+ tech stacks (React.js, Node.js, WordPress), from database schema to production hosting
                  </span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>
                    Provided ongoing support across 4 technology stacks (React.js, Node.js, MySQL, WordPress), covering bug fixes, feature additions, performance tuning, and deployment troubleshooting
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section: Key Projects */}
          <div className="mt-3">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-0.5 mb-1.5">
              Key Projects
            </div>
            <div className="space-y-2">
              {/* Project 1 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9.5px] text-[#111111]">
                    Vendi Chocolates 2.0 - POS System
                  </span>
                  <span className="italic text-[8.5px] text-[#555555]">
                    React.js, Node.js, MySQL
                  </span>
                </div>
                <ul className="text-[9px] text-[#222222] space-y-0.5 mt-0.5 leading-[1.3]">
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Shipped and deployed a full-stack Point-of-Sale system for a live chocolate retail business across Railway, Render, and Vercel</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Diagnosed and fixed a MySQL temporary-table overflow caused by large base64-encoded images inside a JOIN query, restoring checkout reliability</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Addressed cross-origin (CORS) issues and fixed Cloudinary URL concatenation bugs across multiple React components</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Added double-tap prevention on checkout and lazy image loading via a shared cache hook to improve performance</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Investigated and settled billing discrepancies and product display ordering issues in the live system</span>
                  </li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9.5px] text-[#111111]">
                    Go Sarthii - Luxury Automotive Website
                  </span>
                  <span className="italic text-[8.5px] text-[#555555]">
                    React.js, Vite
                  </span>
                </div>
                <ul className="text-[9px] text-[#222222] space-y-0.5 mt-0.5 leading-[1.3]">
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Maintained a luxury automotive brand website built with React and Vite</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Fixed recurring JSX and image-path bugs, updated dynamic content such as the founder biography, and integrated an Instagram gallery feed</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span>•</span>
                    <span>Solved repeated Vercel deployment failures to keep the production site stable</span>
                  </li>
                </ul>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9.5px] text-[#111111]">
                    Document Converter Tool
                  </span>
                  <span className="italic text-[8.5px] text-[#555555]">
                    React.js, Node.js
                  </span>
                </div>
                <p className="text-[9px] text-[#222222] mt-0.5 leading-[1.3]">
                  • Engineered a full-stack document conversion tool (React frontend, Node.js backend) delivering Merge PDF, Split PDF, Add Watermark, and JPG-to-PDF features behind a clean, responsive interface
                </p>
              </div>

              {/* Project 4 */}
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[9.5px] text-[#111111]">
                    Text Extraction and QA Browser Extension
                  </span>
                  <span className="italic text-[8.5px] text-[#555555]">
                    JavaScript, Chrome Extension API, OpenAI API
                  </span>
                </div>
                <p className="text-[9px] text-[#222222] mt-0.5 leading-[1.3]">
                  • Created a Chrome extension that extracts visible webpage text in real time and answers questions on it using the OpenAI API
                </p>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-1 mb-2">
              Education
            </div>
            <div className="space-y-1 text-[9px] text-[#222222]">
              <div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#111111]">
                    Master of Computer Applications (MCA)
                  </span>
                  <span className="text-[#555555]">Completed Aug 2026</span>
                </div>
                <div className="italic text-[#555555]">
                  Ramdeobaba University, Nagpur (Formerly RCOEM) - CGPA: 8.43/10
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="font-bold text-[#111111]">
                    B.Com (Computer Applications)
                  </span>
                  <span className="text-[#555555]">2023</span>
                </div>
                <div className="italic text-[#555555]">
                  Government Arts and Commerce Naveen College, Bhopal - 71.33%
                </div>
              </div>
              <div className="flex justify-between">
                <span>Higher Secondary Certificate (HSC) | 2020</span>
                <span className="font-bold">84%</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary School Certificate (SSC) | 2018</span>
                <span className="font-bold">86%</span>
              </div>
            </div>
          </div>

          {/* Section: Certifications and Additional */}
          <div className="mt-4">
            <div className="text-[10px] font-bold text-[#1F5F99] uppercase tracking-wide border-b border-[#1F5F99] pb-1 mb-2">
              Certifications and Additional Information
            </div>
            <p className="text-[9px] text-[#222222] leading-[1.35]">
              • Certifications (Meta, Coursera): Front-End Development, JavaScript, React Basics. SIH Hackathon participant; Environmental Club member. Languages: English, Hindi, Marathi
            </p>
          </div>
        </div>

        {/* Bottom Download Button */}
        <div className="w-full mt-4">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full h-12 rounded-full bg-[var(--accent)] text-white text-[14px] font-medium flex items-center justify-center gap-2 shadow hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            <IconDownload size={18} strokeWidth={2.2} />
            <span>Download Official PDF Resume</span>
          </button>
        </div>
      </div>
    </AppWindow>
  );
};
