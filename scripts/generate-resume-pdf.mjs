import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateResumePDF() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter size in points: 612 x 792
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const leftMargin = 38;
  const rightMargin = 38;
  const contentWidth = width - leftMargin - rightMargin;

  let y = height - 36;

  // Colors
  const black = rgb(0.1, 0.1, 0.1);
  const headerBlue = rgb(0.12, 0.38, 0.65);
  const darkGray = rgb(0.25, 0.25, 0.25);
  const dividerColor = rgb(0.15, 0.35, 0.58);

  // Helper for drawing section header
  function drawSectionHeader(title) {
    y -= 10;
    page.drawText(title, {
      x: leftMargin,
      y,
      size: 10,
      font: fontHelveticaBold,
      color: dividerColor,
    });
    y -= 3;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - rightMargin, y },
      thickness: 1,
      color: dividerColor,
    });
    y -= 9;
  }

  // Helper for drawing wrapped text
  function drawWrappedText(text, size, font, color, indent = 0, lineSpacing = 11) {
    const maxWidth = contentWidth - indent;
    const words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > maxWidth && line.length > 0) {
        page.drawText(line, {
          x: leftMargin + indent,
          y,
          size,
          font,
          color,
        });
        y -= lineSpacing;
        line = words[i];
      } else {
        line = testLine;
      }
    }

    if (line) {
      page.drawText(line, {
        x: leftMargin + indent,
        y,
        size,
        font,
        color,
      });
      y -= lineSpacing;
    }
  }

  // 1. Header: AKASH PATANKAR
  page.drawText("AKASH PATANKAR", {
    x: leftMargin,
    y,
    size: 17,
    font: fontHelveticaBold,
    color: black,
  });
  y -= 14;

  // Subtitle
  page.drawText("Full-Stack Web Developer (React.js / Node.js)", {
    x: leftMargin,
    y,
    size: 10,
    font: fontHelvetica,
    color: headerBlue,
  });
  y -= 13;

  // Contact line
  const contactText =
    "Bhopal, MP | 8827439284 | akashpatankar987@gmail.com | linkedin.com/in/akash-patankar-631410282 | github.com/akash716";
  page.drawText(contactText, {
    x: leftMargin,
    y,
    size: 8,
    font: fontHelvetica,
    color: darkGray,
  });

  const contactWidth = fontHelvetica.widthOfTextAtSize(contactText, 8);
  // Draw Portfolio badge
  const badgeX = leftMargin + contactWidth + 6;
  page.drawRectangle({
    x: badgeX,
    y: y - 1,
    width: 38,
    height: 10,
    color: rgb(0.12, 0.38, 0.65),
  });
  page.drawText("Portfolio", {
    x: badgeX + 3,
    y: y + 0.5,
    size: 7,
    font: fontHelveticaBold,
    color: rgb(1, 1, 1),
  });

  y -= 4;

  // 2. PROFESSIONAL SUMMARY
  drawSectionHeader("PROFESSIONAL SUMMARY");
  drawWrappedText(
    "Full-stack web developer with hands-on experience shipping production React.js and Node.js applications, including a live POS system deployed across 3 hosting platforms. Completed a 1-year web development internship at WebWorks Solution (Aug 2025 - Jul 2026), delivering full-stack and WordPress-based projects across branding, retail, and media industries. Comfortable owning a project end-to-end - frontend, backend, MySQL database design, and deployment - with a strong record of debugging real production issues.",
    8.5,
    fontHelvetica,
    black,
    0,
    11.5
  );

  // 3. TECHNICAL SKILLS
  drawSectionHeader("TECHNICAL SKILLS");
  const skills = [
    { label: "Languages:", text: "JavaScript, Java, SQL, HTML5, CSS3" },
    { label: "Frontend:", text: "React.js, Vite, Responsive/Cross-browser UI, GSAP, REST API integration" },
    { label: "Backend:", text: "Node.js, Express, REST APIs, server-side file processing" },
    { label: "Databases:", text: "MySQL, SQL, XAMPP, database migration and debugging" },
    { label: "Tools and Platforms:", text: "Git, GitHub, VS Code, Vercel, Railway, Render, Cloudinary, Chrome Extension APIs, OpenAI API" },
    { label: "Other:", text: "WordPress and Elementor client-site development" },
  ];

  for (const s of skills) {
    page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
    page.drawText(s.label + " ", { x: leftMargin + 8, y, size: 8.5, font: fontHelveticaBold, color: black });
    const labelW = fontHelveticaBold.widthOfTextAtSize(s.label + " ", 8.5);
    page.drawText(s.text, { x: leftMargin + 8 + labelW, y, size: 8.5, font: fontHelvetica, color: black });
    y -= 11.5;
  }

  // 4. EXPERIENCE
  drawSectionHeader("EXPERIENCE");
  page.drawText("Full-Stack Developer Intern, WebWorks Solution", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| Aug 2025 - Jul 2026", {
    x: leftMargin + 230,
    y,
    size: 9,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;
  page.drawText("Mumbai, India", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;

  const expBullets = [
    "Delivered full-stack and WordPress-based websites across 3 industries - branding, retail, and media - including Vendi Chocolates, Go Sarthii, Goswami Storage Racks, and Hangover Media",
    "Designed, built, and deployed client applications end-to-end across 3+ tech stacks (React.js, Node.js, WordPress), from database schema to production hosting",
    "Provided ongoing support across 4 technology stacks (React.js, Node.js, MySQL, WordPress), covering bug fixes, feature additions, performance tuning, and deployment troubleshooting",
  ];
  for (const b of expBullets) {
    page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
    drawWrappedText(b, 8.5, fontHelvetica, black, 10, 11);
  }

  // 5. KEY PROJECTS
  drawSectionHeader("KEY PROJECTS");

  // Vendi
  page.drawText("Vendi Chocolates 2.0 - POS System", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| React.js, Node.js, MySQL", {
    x: leftMargin + 185,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;
  const vendiBullets = [
    "Shipped and deployed a full-stack Point-of-Sale system for a live chocolate retail business across Railway, Render, and Vercel",
    "Diagnosed and fixed a MySQL temporary-table overflow caused by large base64-encoded images inside a JOIN query, restoring checkout reliability",
    "Addressed cross-origin (CORS) issues and fixed Cloudinary URL concatenation bugs across multiple React components",
    "Added double-tap prevention on checkout and lazy image loading via a shared cache hook to improve performance",
    "Investigated and settled billing discrepancies and product display ordering issues in the live system",
  ];
  for (const b of vendiBullets) {
    page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
    drawWrappedText(b, 8.5, fontHelvetica, black, 10, 10.5);
  }

  // Go Sarthii
  y -= 1;
  page.drawText("Go Sarthii - Luxury Automotive Website", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| React.js, Vite", {
    x: leftMargin + 205,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;
  const sarthiiBullets = [
    "Maintained a luxury automotive brand website built with React and Vite",
    "Fixed recurring JSX and image-path bugs, updated dynamic content such as the founder biography, and integrated an Instagram gallery feed",
    "Solved repeated Vercel deployment failures to keep the production site stable",
  ];
  for (const b of sarthiiBullets) {
    page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
    drawWrappedText(b, 8.5, fontHelvetica, black, 10, 10.5);
  }

  // Document Converter
  y -= 1;
  page.drawText("Document Converter Tool", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| React.js, Node.js", {
    x: leftMargin + 130,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;
  page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
  drawWrappedText(
    "Engineered a full-stack document conversion tool (React frontend, Node.js backend) delivering Merge PDF, Split PDF, Add Watermark, and JPG-to-PDF features behind a clean, responsive interface",
    8.5,
    fontHelvetica,
    black,
    10,
    10.5
  );

  // Text Extraction
  y -= 1;
  page.drawText("Text Extraction and QA Browser Extension", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| JavaScript, Chrome Extension API, OpenAI API", {
    x: leftMargin + 215,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;
  page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
  drawWrappedText(
    "Created a Chrome extension that extracts visible webpage text in real time and answers questions on it using the OpenAI API",
    8.5,
    fontHelvetica,
    black,
    10,
    10.5
  );

  // 6. EDUCATION
  drawSectionHeader("EDUCATION");
  page.drawText("Master of Computer Applications (MCA)", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| Completed Aug 2026", {
    x: leftMargin + 205,
    y,
    size: 8.5,
    font: fontHelvetica,
    color: darkGray,
  });
  y -= 11;
  page.drawText("Ramdeobaba University, Nagpur (Formerly RCOEM) - CGPA: 8.43/10", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;

  page.drawText("B.Com (Computer Applications)", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontHelveticaBold,
    color: black,
  });
  page.drawText("| 2023", {
    x: leftMargin + 160,
    y,
    size: 8.5,
    font: fontHelvetica,
    color: darkGray,
  });
  y -= 11;
  page.drawText("Government Arts and Commerce Naveen College, Bhopal - 71.33%", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontHelveticaOblique,
    color: darkGray,
  });
  y -= 11;

  page.drawText("Higher Secondary Certificate (HSC) | 2020 | 84%", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontHelvetica,
    color: black,
  });
  y -= 11;
  page.drawText("Secondary School Certificate (SSC) | 2018 | 86%", {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontHelvetica,
    color: black,
  });
  y -= 4;

  // 7. CERTIFICATIONS AND ADDITIONAL INFORMATION
  drawSectionHeader("CERTIFICATIONS AND ADDITIONAL INFORMATION");
  page.drawText("• ", { x: leftMargin, y, size: 8.5, font: fontHelveticaBold, color: black });
  drawWrappedText(
    "Certifications (Meta, Coursera): Front-End Development, JavaScript, React Basics. SIH Hackathon participant; Environmental Club member. Languages: English, Hindi, Marathi",
    8.5,
    fontHelvetica,
    black,
    10,
    11
  );

  const pdfBytes = await pdfDoc.save();

  const publicDir = path.resolve("./public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "Akash_Patankar_Resume.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log("Successfully generated PDF at:", outputPath);
}

generateResumePDF().catch(console.error);
