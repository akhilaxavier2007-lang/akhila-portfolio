# AWS Amplify Hosting & Deployment Guide
> **Project:** Akhila Xavier — My Digital Universe  
> **Target Platform:** AWS Amplify Hosting (Static Web App)  
> **Event:** AWS Student Builder Challenge

---

## 📋 Executive Summary

This guide outlines the complete, production-grade deployment procedure for **Akhila Xavier — My Digital Universe** on **AWS Amplify Hosting**. 

Because this application is built with a pure, lightweight static architecture (HTML5, CSS3, vanilla JavaScript), it requires zero server-side runtimes or compute instances (such as EC2 or Lambda). Instead, it deploys directly to AWS edge infrastructure, maximizing performance, reliability, and security while remaining 100% within the **AWS Free Tier**.

---

## ☁️ AWS Services Utilized in Architecture

| AWS Service | Architecture Role | Benefit |
| :--- | :--- | :--- |
| **AWS Amplify Hosting** | CI/CD Git integration & continuous hosting platform | Automated builds upon git push, branch previews, zero-downtime releases |
| **Amazon S3** | Durable static asset storage repository | Secure underlying object storage for HTML, CSS, JavaScript, and vector assets |
| **Amazon CloudFront** | Global Content Delivery Network (CDN) edge network | Low-latency caching across 450+ Points of Presence (PoPs) worldwide |
| **AWS Certificate Manager (ACM)** | Automated SSL/TLS certificate provisioning | Free HTTPS encryption and automatic yearly renewal |

---

## 🛠️ Phase 1: GitHub Repository Initialization

Before connecting to AWS Amplify, the local project must be pushed to your personal GitHub account.

### Step 1.1: Verify Project Files
Open PowerShell in the project directory:
```powershell
cd C:\Users\LENOVO\OneDrive\Desktop\akhila-portfolio
Get-ChildItem
```
Ensure that `index.html`, `style.css`, `script.js`, `config.js`, `amplify.yml`, and `.gitignore` are present.

### Step 1.2: Initialize Local Git Repository
```powershell
git init
git add .
git commit -m "feat: initial commit of Akhila Xavier My Digital Universe for AWS Student Builder Challenge"
```

### Step 1.3: Create a GitHub Repository
1. Log in to your [GitHub Account](https://github.com).
2. Click **New Repository**.
3. Name the repository: `akhila-portfolio` (or `my-digital-universe`).
4. Set visibility to **Public** (recommended for student challenges) or **Private**.
5. Leave "Initialize this repository with a README" **unchecked** (we already have a complete README).
6. Click **Create repository**.

### Step 1.4: Push Local Code to GitHub
Replace `YOUR_USERNAME` with your actual GitHub username:
```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/akhila-portfolio.git
git push -u origin main
```

---

## 🚀 Phase 2: Deploying to AWS Amplify Hosting

### Step 2.1: Access the AWS Amplify Console
1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. In the top search bar, search for **AWS Amplify** and select the service.
3. In the Amplify dashboard, click **Deploy an app** (or **Host web app**).

### Step 2.2: Connect GitHub Repository
1. Select **GitHub** as your Git provider.
2. Click **Next**.
3. Authorize AWS Amplify to access your GitHub repositories.
4. From the **Repository** dropdown, select `akhila-portfolio`.
5. From the **Branch** dropdown, select `main`.
6. Click **Next**.

### Step 2.3: Verify Build Settings (`amplify.yml`)
Amplify will automatically detect the pre-configured `amplify.yml` included in the root of this project:

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
```
- **App name:** `akhila-portfolio`
- **Environment:** `main`
- Verify that no compile commands are needed (static website).
- Click **Next**.

### Step 2.4: Review and Deploy
1. Review all repository and branch settings.
2. Click **Save and deploy**.
3. AWS Amplify will automatically begin the 4-stage pipeline:
   - **Provision:** Allocating cloud build environment.
   - **Build:** Packaging static files.
   - **Deploy:** Uploading assets to Amazon S3 & syncing with Amazon CloudFront.
   - **Verify:** Generating a preview screenshot and health check.

---

## ✅ Phase 3: Live Verification & Testing

Once deployment completes (typically under 2 minutes), AWS Amplify generates a live HTTPS URL in the following format:
```text
https://main.d123456abcdefg.amplifyapp.com
```

### Verification Checklist:
- [ ] **Homepage Load:** Confirm the site loads with zero console errors.
- [ ] **Canvas Particle Background:** Ensure the subtle starfield canvas renders smoothly behind the text.
- [ ] **Interactive Solar System:** Click all three orbiting planets (`About Me`, `Tech Superpowers`, `Projects`) to verify that the glass-card dossiers pop up and close properly.
- [ ] **Accessibility Orbit Toggle:** Click the "Pause Orbit" button to verify animation halts cleanly.
- [ ] **Constellation Map:** Click the stars in *"The Little Things That Make Me Me"* to verify interactive interest revelations.
- [ ] **Mobile Responsiveness:** Open the live link on a mobile device (or in Chrome DevTools Device Mode) to verify responsive scaling, absence of horizontal scrolling, and functional mobile drawer menu.
- [ ] **Contact Links:** Verify that links updated in `config.js` open correctly and unconfigured links display the safe fallback message without broken behavior.

---

## 🌐 Phase 4: Custom Domain Setup (Optional)

If you own a custom domain (e.g., `akhilaxavier.com` or `akhila.dev`):
1. In the AWS Amplify Console sidebar, navigate to **App settings** > **Domain management**.
2. Click **Add domain**.
3. Enter your domain name and follow the automated DNS verification wizard (AWS Route 53 or your third-party registrar).
4. Amplify will automatically provision an SSL certificate via **AWS Certificate Manager (ACM)** and route traffic through CloudFront.

---

## 🔒 Security & Free Tier Compliance

- **No AWS Keys in Git:** The website runs purely as public frontend static assets. No `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` is required or stored.
- **AWS Free Tier Coverage:** AWS Amplify Hosting includes 1,000 build minutes per month, 15 GB of static hosting storage, and 15 GB of data served per month free for 12 months.

---

## 📝 Post-Deployment Record

*Document your live deployment details below for submission to the AWS Student Builder Challenge:*

- **GitHub Repository URL:** `[To be filled after git push]`
- **AWS Amplify Live App URL:** `[To be filled after Amplify build completion]`
- **Deployment Region:** `[e.g., us-east-1 / ap-south-1]`
- **Date Deployed:** `[Current Date]`
- **Submission Status:** Ready for Review

