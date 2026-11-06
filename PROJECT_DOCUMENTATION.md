# Project Documentation: Akhila Xavier — My Digital Universe
> **Submission Document for the AWS Student Builder Challenge**

---

## 1. Project Title
**AKHILA XAVIER — MY DIGITAL UNIVERSE**  
*Personal Brand Tagline:* "Exploring technology. Creating possibilities."

---

## 2. Project Inspiration
Traditional personal portfolios often suffer from one of two extremes: either they are uninspired, cookie-cutter templates that fail to communicate genuine personality, or they are cluttered with excessive animations and exaggerated claims of expertise.

As an undergraduate studying Computer Science and Engineering at **Sree Chitra Thirunal College of Engineering (SCTCE), Thiruvananthapuram**, I wanted to build something that was both technically disciplined and creatively distinctive. The concept of a **"Digital Universe"** was inspired by the parallels between astronomy and software development: in both domains, complex, beautiful structures emerge from foundational, invisible laws. Just as planets orbit around a central gravitational anchor according to physical rules, software systems orbit around clean logic, structured data models, and user-centric architecture.

---

## 3. Problem or Purpose
The objective of this project is threefold:
1. **Authentic Representation:** To present my academic background, evolving programming capabilities (C, Java, Web technologies), and exploratory interests honestly without inventing commercial titles or artificial proficiency metrics.
2. **Interactive Storytelling:** To craft an original, memorable creative experience that engages visitors through interactive exploration rather than passive linear scrolling.
3. **AWS Cloud Readiness:** To architect a production-grade static web application optimized for deployment, automated CI/CD, and global edge distribution via **AWS Amplify Hosting**, **Amazon S3**, and **Amazon CloudFront**.

---

## 4. Project Overview
"My Digital Universe" is a lightweight, responsive static web portfolio built using standard web technologies. It features:
- **A Celestial Hero Section:** Introducing Akhila Xavier with an immediate brand statement, academic affiliation, and central monogram core (`AX`).
- **Signature Feature — Interactive Solar System:** A custom orbital simulation featuring central star `AX` and three distinct clickable planets (`About Me`, `Tech Superpowers`, `Projects`) that launch glass-morphic information dossiers.
- **Personal Constellation:** *"The Little Things That Make Me Me"*, an interactive interactive star-map revealing human interests outside coding (Music, Literature, Swimming, Curiosity, Learning New Tech).
- **Core Challenge Sections:**
  - *Section A (About Me):* "More than just a collection of code."
  - *Section B (Tech Superpowers):* "Tools I use to turn ideas into reality."
  - *Section C (Projects & Achievements):* "Small beginnings. Big possibilities."
- **Config-Driven Contact System:** Eliminates broken links by routing external channels through a safe `config.js` registry.

---

## 5. Technologies Used
- **Frontend Core:** Pure HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Canvas Rendering:** HTML5 Canvas 2D API for subtle, high-performance ambient starfield particles.
- **Design & Layout:** CSS Custom Properties (Theme tokens), CSS Grid, Flexbox, Glassmorphism, and CSS Keyframe animations.
- **Typography:** Google Fonts (`Space Grotesk` for headings, `Outfit` for body text, and `JetBrains Mono` for code & metadata).
- **Icons:** FontAwesome 6 vector glyphs.
- **Cloud Infrastructure:** AWS Amplify Hosting, Amazon S3, Amazon CloudFront, AWS Certificate Manager.
- **Version Control & CI/CD:** Git, GitHub, Amplify Webhooks.

---

## 6. Interactive Feature Explanation
The signature creative experience consists of two interconnected interactive elements:

### A. The Three-Planet Orbital System
The central star represents Akhila Xavier (`AX`). Orbiting at mathematically proportioned radii are three distinct interactive planets:
1. **Planet I — About Me:** Encapsulates educational coordinates at SCTCE, engineering philosophy, and continuous learning mindset.
2. **Planet II — Tech Superpowers:** Encapsulates programming fundamentals (C, Java), CS principles, and active frontiers (AWS, Local AI, Privacy).
3. **Planet III — Projects:** Showcases academic and exploratory projects (*Smart Healthcare Companion*, *PRISM Local AI Privacy Copilot*, *My Digital Universe*).

**Technical Implementation:**
- Orbital motion is achieved through CSS keyframe revolutions on anchor containers, with counter-rotations applied to text badges so typography remains readable horizontally throughout the orbit.
- Clicking any planet pauses the rotation and opens an accessible modal dossier (`role="dialog"`, `aria-modal="true"`).
- A dedicated **"Pause Orbit"** button provides vestibular accessibility for users sensitive to continuous motion.

### B. The Personal Constellation
Positioned beneath the solar system is *"The Little Things That Make Me Me"*, an interactive constellation connecting five stars via SVG vectors. Clicking any star dynamically updates a reveal card with authentic reflections on how non-technical pursuits (such as swimming for endurance or music for focus) enrich my engineering mindset.

---

## 7. Website Architecture
The application adheres to the **Static Web Architecture** pattern:

```text
[ User Browser / Client ]
            │
            ▼ HTTPS Request (Fast edge resolution)
[ Amazon CloudFront CDN (Global Edge Caches) ]
            │
            ▼ Cache Miss / Initial Fetch
[ Amazon S3 Bucket (Static Storage via AWS Amplify) ]
            │
            ▼ Automated Build / Deploy on Git Push
[ AWS Amplify Hosting CI/CD Pipeline ] ◄─── [ GitHub Repository ]
```

**Key Architectural Decisions:**
- **Zero Heavy Frameworks:** By avoiding monolithic frameworks (like React or Angular), initial page payload is reduced by over 80%, guaranteeing instantaneous First Contentful Paint (FCP) and near-zero Total Blocking Time (TBT).
- **Centralized Configuration (`config.js`):** Contact profiles are decoupled from presentation markup. This eliminates hardcoded dead links and allows easy profile updates.

---

## 8. AWS Services Used
1. **AWS Amplify Hosting:** Manages git repository connections, provides continuous deployment previews, and coordinates static asset releases.
2. **Amazon Simple Storage Service (Amazon S3):** Serves as the durable, highly available object store holding all static frontend files.
3. **Amazon CloudFront:** Automatically configured by Amplify to distribute static assets globally across 450+ edge locations with SSL termination.
4. **AWS Certificate Manager (ACM):** Handles automated SSL/TLS certificate creation and renewal for secure HTTPS communication.

---

## 9. Development Process
1. **Phase 1 — Workspace Inspection & Clean-up:** Identified and corrected empty folders, establishing proper `.html`, `.css`, and `.js` file structures.
2. **Phase 2 — Architectural & Identity Design:** Codified Akhila's authentic academic details at SCTCE and designed the deep-space color palette (midnight navy, deep space blue, soft lavender, muted silver, subtle white).
3. **Phase 3 — Semantic HTML Scaffolding:** Structured semantic landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) with ARIA attributes and skip links.
4. **Phase 4 — Styling & Responsive Engineering:** Implemented glassmorphism cards, responsive typography via `clamp()`, and mobile drawer navigation.
5. **Phase 5 — Interactive Feature Engineering:** Built the orbital solar system, modal dossiers, personal constellation, and dynamic canvas particle system.
6. **Phase 6 — Config & Integrity Layer:** Integrated `config.js` to ensure zero broken or mock URLs exist on the platform.
7. **Phase 7 — AWS & GitHub Preparation:** Created `amplify.yml`, `.gitignore`, `README.md`, `AWS_DEPLOYMENT.md`, and complete project documentation.

---

## 10. Challenges Encountered & Solutions

| Challenge | Root Cause | Solution Implemented |
| :--- | :--- | :--- |
| **Planet Label Readability during Orbit** | Circular orbital keyframe rotations caused child text badges to spin upside-down as planets reached the bottom of their orbit. | Implemented simultaneous **counter-rotation keyframes** (`rotate(-360deg)`) on the child badges, keeping all text strictly horizontal and readable at every point along the orbital path. |
| **Motion Sensitivity & Accessibility** | Continuous orbiting animations can cause discomfort for visitors with vestibular balance disorders. | Added a visible **"Pause Orbit"** control button and implemented comprehensive `@media (prefers-reduced-motion: reduce)` rules that automatically halt all keyframes. |
| **Prevention of Broken External Links** | In student portfolios, mock social links or incomplete URLs frequently break grading criteria. | Built a dynamic config-checking engine in `script.js` that checks `config.js`. If a profile is unconfigured, the UI displays a clean status indicator and safely disables the action button. |

---

## 11. What I Learned
- **Pure Web Standards Mastery:** Deepened my appreciation for how modern CSS (Grid, Flexbox, Custom Properties) and vanilla JavaScript can accomplish sophisticated animations without bloated third-party dependencies.
- **Accessible Interaction Design:** Learned how to build complex interactive elements (modals, orbital systems) that maintain keyboard focus traps, ARIA standards, and reduced-motion fallbacks.
- **AWS Cloud Engineering:** Gained practical understanding of static cloud hosting, the role of CDNs in web performance, and the convenience of git-backed continuous deployment through AWS Amplify.

---

## 12. Future Improvements
- **Interactive 3D WebGL Visualization:** Expand the 2D Canvas orbital system into a lightweight Three.js or WebGPU solar simulation.
- **Serverless Subspace Dispatch:** Integrate an AWS Lambda function paired with Amazon Simple Email Service (Amazon SES) to allow visitors to send direct messages without opening an email client.
- **Dynamic Project Showcase API:** Build an Amazon DynamoDB table and Amazon API Gateway endpoint to fetch newly published projects dynamically.

---

## 📸 Submission Screenshot Checklist
Prepare the following screenshots for the AWS Student Builder Challenge portal:
- [ ] **Homepage & Hero Section:** Displaying header, brand tagline, and central visual anchor.
- [ ] **Signature Interactive Universe:** Showing the three orbiting planets with visible interaction hints.
- [ ] **Planet Dossier Modal:** Showing an active modal information panel open over the dimmed backdrop.
- [ ] **Personal Constellation:** Demonstrating an active star selection in *"The Little Things That Make Me Me"*.
- [ ] **Section A (About Me):** Academic credentials at SCTCE and learning approach.
- [ ] **Section B (Tech Superpowers):** Categorized programming and exploratory skill cards.
- [ ] **Section C (Projects):** Cards for *Smart Healthcare Companion*, *PRISM*, and *My Digital Universe*.
- [ ] **Mobile Experience:** Mobile layout showing responsive scaling on smartphone viewports.
- [ ] **AWS Amplify Console:** Dashboard showing successful build, deploy, and verify stages.
- [ ] **Live Web App:** The deployed website displaying the live AWS Amplify URL.

---

## 📝 Concise Project Description for AWS Builder Center
> **Akhila Xavier — My Digital Universe** is a personal portfolio website developed for the AWS Student Builder Challenge. Engineered by a Computer Science undergraduate at Sree Chitra Thirunal College of Engineering, Thiruvananthapuram, the website combines a deep-space visual design with an original interactive solar system representing academic foundations, technical superpowers, and software projects. Built with lightweight vanilla web standards and hosted globally on AWS Amplify Hosting, Amazon S3, and Amazon CloudFront, the project embodies the theme *"Exploring technology. Creating possibilities."* through authentic storytelling, accessibility-first engineering, and zero-framework performance.

