# Akhila Xavier — My Digital Universe
> **"Exploring technology. Creating possibilities."**  
> Prepared for the **AWS Student Builder Challenge**

---

## 🌌 Project Overview

**My Digital Universe** is an original, production-quality personal portfolio engineered by **Akhila Xavier**, a B.Tech Computer Science and Engineering student at **Sree Chitra Thirunal College of Engineering (SCTCE), Thiruvananthapuram**.

Designed with a minimal, futuristic aesthetic inspired by deep space and digital architecture, this website serves as a living representation of Akhila's academic foundation, technical capabilities, problem-solving mindset, and continuous journey through computer science.

---

## ✨ Key Features

1. **Signature Creative Feature: Interactive Solar System**
   - **Central Star `AX`:** A celestial anchor representing Akhila Xavier.
   - **Three Orbiting Planets:**
     - **Planet I (About Me):** Educational coordinates at SCTCE, background, and learning philosophy.
     - **Planet II (Tech Superpowers):** Core languages (C, Java), CS fundamentals, and active frontiers.
     - **Planet III (Projects):** Verified software applications and research concepts.
   - **Interactive Modal Panels:** Clicking any planet pauses or reveals a glass-morphic dossier with smooth animations, accessible focus management, and keyboard escape controls.
   - **Orbital Accessibility Control:** A dedicated pause/resume button allowing users to halt orbit animations in accordance with vestibular accessibility standards.

2. **Personal Constellation: "The Little Things That Make Me Me"**
   - An optional interactive constellation map connecting stars representing **Music**, **Books**, **Swimming**, **Curiosity**, and **Learning New Tech**.
   - Clicking each star reveals an authentic reflection showing the human curiosity behind the code.

3. **Required Portfolio Sections**
   - **Section A — About Me:** *"More than just a collection of code."* (Authentic student background, philosophy of continuous learning).
   - **Section B — Tech Superpowers:** *"Tools I use to turn ideas into reality."* (Categorized into Programming, CS Concepts, Web Development, Tools, and Currently Exploring).
   - **Section C — Projects & Achievements:** *"Small beginnings. Big possibilities."*
     - *Smart Healthcare Companion* (Java, Swing, AWT, JDBC, MySQL)
     - *PRISM Local AI Privacy Copilot* (Privacy Engineering Research & Concept)
     - *My Digital Universe* (Static Architecture, Canvas 2D, AWS Amplify Hosting)

4. **Zero-Broken-Link Contact Engine (`config.js`)**
   - No mock or invented URLs. Contact channels (Email, GitHub, LinkedIn) are managed through a centralized configuration file.
   - If a link has not been filled out yet, the UI displays a clean configuration notice rather than leading visitors to a dead link.

5. **Pure, Lightweight Technical Architecture**
   - 100% Vanilla HTML5, modern CSS3, and modular ES6+ JavaScript.
   - Zero bulky frameworks (no React, Next.js, or complex build tooling required).
   - Instant loading speeds and optimal Lighthouse scores.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Markup & Semantics** | Semantic HTML5, ARIA Landmarks, Open Graph Meta |
| **Styling & Motion** | CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism, Keyframes) |
| **Interactive Logic** | Modular Vanilla JavaScript (ES6+), HTML5 Canvas 2D, Intersection Observer |
| **Cloud Hosting & CDN**| AWS Amplify Hosting, Amazon S3, Amazon CloudFront |
| **Fonts & Icons** | Space Grotesk, Outfit, JetBrains Mono, FontAwesome 6 |

---

## 📂 Project Directory Structure

```text
akhila-portfolio/
│
├── index.html                 # Semantic HTML document with accessibility landmarks
├── style.css                  # Futuristic cosmic design tokens and responsive styles
├── script.js                 # Pure JavaScript engine (Canvas, Orbit, Modal, Constellation)
├── config.js                 # Central configuration for contact details & profiles
├── favicon.svg               # Vector SVG cosmic favicon
│
├── amplify.yml               # Automated build configuration for AWS Amplify Hosting
├── .gitignore                # Git exclusions (credentials, OS artifacts, logs)
│
├── README.md                 # Complete repository overview and local setup guide
├── AWS_DEPLOYMENT.md         # Step-by-step AWS Amplify deployment manual
└── PROJECT_DOCUMENTATION.md  # Comprehensive project report for AWS judging criteria
```

---

## 🚀 Local Setup & Testing

Because the website uses a clean static architecture, running and testing it locally is simple:

### Option 1: Direct File Preview
Double-click `index.html` to open the website directly in any modern browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python (pre-installed on Windows/macOS/Linux):
```powershell
# In the project root:
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## ⚙️ Personalizing Your Contact Links

Before deploying, open `config.js` in your editor and input your actual profiles:

```javascript
const USER_CONFIG = {
  links: {
    email: "your.name@example.com",
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/your-username",
    portfolioRepository: "https://github.com/your-username/akhila-portfolio"
  }
};
```
*If a field is left empty `""`, the website gracefully displays a status note ("Ready to configure") to prevent broken links during grading.*

---

## ☁️ AWS Amplify Deployment

This project includes a pre-configured `amplify.yml` file designed for single-click continuous deployment with **AWS Amplify Hosting**.

For step-by-step instructions on connecting your GitHub repository to AWS Amplify, configuring build settings, and publishing your live URL, consult [AWS_DEPLOYMENT.md](file:///c:/Users/LENOVO/OneDrive/Desktop/akhila-portfolio/AWS_DEPLOYMENT.md).

---

## 🔒 Security Best Practices

- **Zero Stored Credentials:** No AWS credentials, access keys, or secrets are present in this repository.
- **Strict `.gitignore`:** Configured to prevent accidental commits of `.env` files, `.aws` directories, and system caches.
- **Safe Static Runtime:** Client-side execution without risky backend dependencies.

---

## 📄 License & Attribution

Designed and developed by **Akhila Xavier** for the **AWS Student Builder Challenge**.  
All rights reserved © 2026.

