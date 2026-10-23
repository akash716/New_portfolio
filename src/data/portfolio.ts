import vendiImg from "@/src/assets/images/vendi_pos_screen_1790884637568.webp";
import vendiAdminImg from "@/src/assets/images/vendi_admin_ui_1790885829285.webp";
import sarthiiImg from "@/src/assets/images/sarthii_car_screen_1790884649727.webp";
import sarthiiFleetImg from "@/src/assets/images/sarthii_fleet_ui_1790885844995.webp";
import docConverterImg from "@/src/assets/images/doc_converter_ui_1790884665145.webp";
import docBatchImg from "@/src/assets/images/doc_batch_ui_1790885857213.webp";
import textQaImg from "@/src/assets/images/browser_extension_ui_1790884680263.webp";
import extensionQaImg from "@/src/assets/images/extension_qa_ui_1790885870207.webp";
import goswamiImg from "@/src/assets/images/goswami_storage_ui_1790885513288.webp";
import goswamiSpecsImg from "@/src/assets/images/goswami_specs_ui_1790885883179.webp";
import hangoverImg from "@/src/assets/images/hangover_media_ui_1790885530279.webp";
import hangoverReelImg from "@/src/assets/images/hangover_reel_ui_1790885898983.webp";

export interface ProjectItem {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  subtitle: string;
  stack: string[];
  role: string;
  year: string;
  status: string;
  summary: string;
  problemFix?: {
    problem: string;
    fix: string;
  };
  whatItIs: string;
  whatIDid: string[];
  coverImage?: string;
  secondaryImage?: string;
  liveUrl?: string; // Only set if confirmed URL provided
  sourceUrl?: string; // Only set if confirmed URL provided
  hasLivePreview?: boolean;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  summaryChipText: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  score: string;
  location?: string;
}

export interface PortfolioData {
  name: string;
  monogram: string;
  title: string;
  subhead: string;
  location: string;
  email: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  phone: string;
  showPhonePublicly: boolean;
  summary: string;
  experience: {
    role: string;
    company: string;
    duration: string;
    location: string;
    bullets: string[];
  };
  projects: ProjectItem[];
  skillsCategories: SkillCategory[];
  education: EducationItem[];
  certifications: string[];
  additional: string[];
  languages: {
    name: string;
    nativeName?: string;
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Akash Patankar",
  monogram: "AP",
  title: "Full-Stack Web Developer",
  subhead: "Akash Patankar · Full-Stack Web Developer",
  location: "Bhopal, MP",
  email: "akashpatankar987@gmail.com",
  github: "github.com/akash716",
  githubUrl: "https://github.com/akash716",
  linkedin: "linkedin.com/in/akash-patankar-631410282",
  linkedinUrl: "https://www.linkedin.com/in/akash-patankar-631410282",
  phone: "8827439284",
  showPhonePublicly: false,
  summary:
    "Full-stack web developer with hands-on experience shipping production React.js and Node.js applications, including a live POS system deployed across 3 hosting platforms. Completed a 1-year web development internship at WebWorks Solution (Aug 2025 – Jul 2026), delivering full-stack and WordPress-based projects across branding, retail, and media industries. Comfortable owning a project end to end (frontend, backend, MySQL database design and deployment) with a strong record of debugging real production issues.",
  experience: {
    role: "Full-Stack Developer Intern",
    company: "WebWorks Solution",
    duration: "Aug 2025 – Jul 2026",
    location: "Mumbai, India",
    bullets: [
      "Delivered full-stack and WordPress-based websites across 3 industries (branding, retail, media), including Vendi Chocolates, Go Sarthii, Goswami Storage Racks, and Hangover Media.",
      "Designed, built, and deployed client applications end to end across 3+ tech stacks (React.js, Node.js, WordPress), from database schema to production hosting.",
      "Provided ongoing support across 4 technology stacks (React.js, Node.js, MySQL, WordPress): bug fixes, feature additions, performance tuning, and deployment troubleshooting."
    ]
  },
  projects: [
    {
      id: "vendi",
      name: "Vendi Chocolates 2.0 POS",
      shortName: "Vendi POS",
      slug: "vendi",
      subtitle: "Point-of-Sale System for Retail Chocolate Business",
      stack: ["React.js", "Node.js", "MySQL", "Railway", "Render", "Vercel"],
      role: "Full-Stack Developer",
      year: "2025 – 2026",
      status: "Live on Railway, Render, Vercel",
      summary:
        "Shipped and deployed a full-stack Point-of-Sale system for a live chocolate retail business across Railway, Render, and Vercel. Diagnosed and fixed a MySQL temporary-table overflow caused by large base64-encoded images inside a JOIN query, restoring checkout reliability. Addressed CORS issues and fixed Cloudinary URL concatenation bugs across multiple React components. Added double-tap prevention on checkout and lazy image loading via a shared cache hook. Investigated and settled billing discrepancies and product display ordering issues in the live system.",
      problemFix: {
        problem: "MySQL temporary-table overflow from base64 images in a JOIN query causing checkout stall",
        fix: "Fixed the temporary-table overflow and restored checkout reliability."
      },
      whatItIs:
        "Point-of-Sale retail management solution for chocolate confectioneries, handling catalog, billing, real-time order processing, and receipt generation.",
      whatIDid: [
        "Shipped and deployed full-stack POS for live chocolate retail business across Railway, Render, and Vercel.",
        "Diagnosed and fixed MySQL temporary-table overflow caused by base64 images in a JOIN, restoring checkout reliability.",
        "Addressed CORS issues and fixed Cloudinary URL concatenation bugs across multiple React components.",
        "Added double-tap prevention on checkout and lazy image loading via a shared cache hook.",
        "Investigated and settled billing discrepancies and product display ordering issues in the live system."
      ],
      coverImage: vendiImg,
      secondaryImage: vendiAdminImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    },
    {
      id: "sarthii",
      name: "Go Sarthii",
      shortName: "Go Sarthii",
      slug: "sarthii",
      subtitle: "Luxury Automotive Brand Web Platform",
      stack: ["React.js", "Vite", "Vercel"],
      role: "Frontend Developer",
      year: "2025 – 2026",
      status: "Production Maintained",
      summary:
        "Maintained a luxury automotive brand website. Fixed recurring JSX and image-path bugs, updated dynamic content such as the founder biography, integrated an Instagram gallery feed, solved repeated Vercel deployment failures to keep production stable.",
      whatItIs:
        "Luxury chauffeur and executive automotive fleet brand website showcasing executive vehicles, dynamic gallery, and founder profile.",
      whatIDid: [
        "Maintained luxury automotive brand website built with React.js and Vite.",
        "Fixed recurring JSX and image-path bugs across multiple views.",
        "Updated dynamic content including executive founder biography and fleet profiles.",
        "Integrated dynamic Instagram gallery feed.",
        "Solved repeated Vercel deployment configuration failures to keep production builds stable."
      ],
      coverImage: sarthiiImg,
      secondaryImage: sarthiiFleetImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    },
    {
      id: "doc-converter",
      name: "Document Converter Tool",
      shortName: "Doc Converter",
      slug: "doc-converter",
      subtitle: "Full-Stack PDF & Document Processing Utility",
      stack: ["React.js", "Node.js", "Express", "REST APIs"],
      role: "Full-Stack Developer",
      year: "2025",
      status: "Completed Tool",
      summary:
        "Full-stack document conversion tool (React frontend, Node.js backend): Merge PDF, Split PDF, Add Watermark, JPG-to-PDF behind a clean, responsive interface.",
      whatItIs:
        "Browser-based document processing suite with dedicated server-side file transformation endpoints.",
      whatIDid: [
        "Architected responsive React.js frontend with drag-and-drop document upload and validation.",
        "Built server-side Node.js pipeline to Merge PDF files and Split multi-page documents.",
        "Developed watermark insertion engine with custom placement and opacity control.",
        "Engineered batch JPG-to-PDF compilation pipeline with high-fidelity output."
      ],
      coverImage: docConverterImg,
      secondaryImage: docBatchImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    },
    {
      id: "text-qa",
      name: "Text Extraction and QA Extension",
      shortName: "Text-QA Extension",
      slug: "text-qa",
      subtitle: "Real-Time Webpage Text QA Browser Extension",
      stack: ["JavaScript", "Chrome Extension API", "OpenAI API"],
      role: "Sole Developer",
      year: "2025",
      status: "Functional Extension",
      summary:
        "Chrome extension that extracts visible webpage text in real time and answers questions on it using the OpenAI API.",
      whatItIs:
        "Contextual browsing assistant that parses page DOM content and provides instant answers to user questions.",
      whatIDid: [
        "Extracted visible webpage text via Chrome Extension content scripts while stripping script and style noise.",
        "Integrated OpenAI API via secure background script communication channels.",
        "Built responsive popup interface for natural-language Q&A with real-time response rendering."
      ],
      coverImage: textQaImg,
      secondaryImage: extensionQaImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    },
    {
      id: "goswami",
      name: "Goswami Storage Racks",
      shortName: "Goswami Racks",
      slug: "goswami",
      subtitle: "Industrial Storage Solutions Client Website",
      stack: ["WordPress", "Elementor", "Client Project"],
      role: "Client-Site Developer (WebWorks Solution)",
      year: "2025 – 2026",
      status: "Client Project",
      summary:
        "Client website for Goswami Storage Racks, delivered during the WebWorks Solution internship.",
      whatItIs:
        "Website for an industrial storage racks business.",
      whatIDid: [
        "Contributed to this client website during the WebWorks Solution internship."
      ],
      coverImage: goswamiImg,
      secondaryImage: goswamiSpecsImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    },
    {
      id: "hangover",
      name: "Hangover Media",
      shortName: "Hangover Media",
      slug: "hangover",
      subtitle: "Creative Agency & Media Client Website",
      stack: ["WordPress", "Elementor", "Client Project"],
      role: "Client-Site Developer (WebWorks Solution)",
      year: "2025 – 2026",
      status: "Client Project",
      summary:
        "Client website for Hangover Media, delivered during the WebWorks Solution internship.",
      whatItIs:
        "Website for a media business.",
      whatIDid: [
        "Contributed to this client website during the WebWorks Solution internship."
      ],
      coverImage: hangoverImg,
      secondaryImage: hangoverReelImg,
      liveUrl: undefined,
      sourceUrl: undefined,
      hasLivePreview: false
    }
  ],
  skillsCategories: [
    {
      id: "languages",
      number: "01",
      title: "Languages",
      summaryChipText: "JavaScript, Java, SQL, HTML5, CSS3",
      skills: ["JavaScript", "Java", "SQL", "HTML5", "CSS3"]
    },
    {
      id: "frontend",
      number: "02",
      title: "Frontend",
      summaryChipText: "React.js, Vite, Responsive UI, GSAP",
      skills: [
        "React.js",
        "Vite",
        "Responsive / Cross-browser UI",
        "GSAP",
        "REST API Integration"
      ]
    },
    {
      id: "backend",
      number: "03",
      title: "Backend & Databases",
      summaryChipText: "Node.js, Express, REST APIs, MySQL",
      skills: [
        "Node.js",
        "Express",
        "REST APIs",
        "Server-Side File Processing",
        "MySQL",
        "SQL",
        "XAMPP",
        "Database Migration & Debugging"
      ]
    },
    {
      id: "tools",
      number: "04",
      title: "Tools & Platforms",
      summaryChipText: "Git, GitHub, Vercel, Railway, Render",
      skills: [
        "Git",
        "GitHub",
        "VS Code",
        "Vercel",
        "Railway",
        "Render",
        "Cloudinary",
        "Chrome Extension APIs",
        "OpenAI API",
        "WordPress & Elementor"
      ]
    }
  ],
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Ramdeobaba University, Nagpur (formerly RCOEM)",
      year: "Aug 2026",
      score: "CGPA 8.43 / 10",
      location: "Nagpur, Maharashtra"
    },
    {
      degree: "B.Com (Computer Applications)",
      institution: "Government Arts and Commerce Naveen College, Bhopal",
      year: "2023",
      score: "71.33%",
      location: "Bhopal, Madhya Pradesh"
    },
    {
      degree: "Higher Secondary Certificate (HSC, Class XII)",
      institution: "",
      year: "2020",
      score: "84.00%"
    },
    {
      degree: "Secondary School Certificate (SSC, Class X)",
      institution: "",
      year: "2018",
      score: "86.00%"
    }
  ],
  certifications: [
    "Front-End Development (Meta / Coursera)",
    "JavaScript (Meta / Coursera)",
    "React Basics (Meta / Coursera)"
  ],
  additional: [
    "Smart India Hackathon (SIH) Participant",
    "Environmental Club Member"
  ],
  languages: [
    { name: "English" },
    { name: "Hindi" },
    { name: "Marathi" }
  ],
};
