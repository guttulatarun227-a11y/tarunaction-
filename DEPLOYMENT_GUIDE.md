# AI FORCE – Capacity Connect: GitHub & Production Deployment Guide

This guide provides a comprehensive, step-by-step walkthrough for initializing a Git repository, configuring project assets (including `.gitignore` and `README.md`), pushing this codebase to **GitHub**, and setting up continuous deployment.

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Project Structure Overview](#2-project-structure-overview)
3. [Step 1: Environment & Git Setup](#step-1-environment--git-setup)
4. [Step 2: Configuring `.gitignore`](#step-2-configuring-gitignore)
5. [Step 3: Generating & Configuring `README.md`](#step-3-generating--configuring-readmemd)
6. [Step 4: Initializing Local Git Repository](#step-4-initializing-local-git-repository)
7. [Step 5: Creating a Repository on GitHub](#step-5-creating-a-repository-on-github)
8. [Step 6: Linking Remote & Pushing to GitHub](#step-6-linking-remote--pushing-to-github)
9. [Step 7: Production Deployment Options](#step-7-production-deployment-options)
   - [Option A: Google Cloud Run (AI Studio Direct / CI/CD)](#option-a-google-cloud-run)
   - [Option B: Vercel / Netlify](#option-b-vercel--netlify)
   - [Option C: Docker Container](#option-c-docker-container)
10. [Step 8: In-App "Deploy to GitHub" Utility](#step-8-in-app-deploy-to-github-utility)
11. [Troubleshooting & FAQs](#troubleshooting--faqs)

---

## 1. Prerequisites

Before getting started, make sure you have:
- **Git** installed on your system (`git --version`).
  - *Windows*: [Download Git for Windows](https://git-scm.com/download/win)
  - *macOS*: `brew install git` or via Xcode command line tools (`xcode-select --install`)
  - *Linux*: `sudo apt-get install git` or `sudo dnf install git`
- A **GitHub account** ([github.com](https://github.com)).
- **Node.js** (v18.0.0 or higher) and **npm** installed.
- **GitHub Authentication**:
  - Either an **SSH Key** configured ([GitHub SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)), OR
  - A **Personal Access Token (Classic or Fine-grained)** with `repo` scope to use with HTTPS.

---

## 2. Project Structure Overview

```text
├── .env.example          # Environment variable template (Never commit secrets)
├── .gitignore            # Git exclusion rules
├── README.md             # Project documentation & setup instructions
├── DEPLOYMENT_GUIDE.md   # This deployment manual
├── package.json          # Node.js dependencies & scripts
├── vite.config.ts        # Vite build tool configuration
├── tsconfig.json         # TypeScript configuration
├── metadata.json         # AI Studio application metadata
├── index.html            # Main Portal landing page
├── courses.html          # Course Catalog & Enrollment
├── course-details.html   # Course curriculum & syllabus
├── ai-assistant.html     # AI Doubt Assistant with Gemini integration
├── live-classes.html     # Virtual interactive webinars & sessions
├── assessments.html      # Skill evaluation & quiz engine
├── dashboard.html        # Student progress & analytics dashboard
├── certificates.html     # Digital verifiable credentials
├── profile.html          # User profile & preferences
├── admin.html            # Faculty & Administrator portal
├── login.html            # Authentication login
├── register.html         # User registration & onboarding
├── css/
│   └── style.css         # Global design system & theme variables
└── js/
    ├── script.js         # Core portal script & GitHub deploy helper
    ├── auth.js           # Authentication & session management
    ├── courses.js        # Course state & catalog engine
    ├── dashboard.js      # Student metrics & chart visualizer
    ├── ai-assistant.js   # Gemini AI reasoning engine
    ├── live-classes.js   # Classroom scheduler & stream manager
    └── admin.js          # Admin dashboard & user management
```

---

## Step 1: Environment & Git Setup

If you are working with a fresh clone or downloaded ZIP, configure your global Git identity:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

Verify your credentials:
```bash
git config --list
```

---

## Step 2: Configuring `.gitignore`

The `.gitignore` file ensures sensitive secrets, bulky temporary artifacts, and dependencies are never committed to your public or private GitHub repository.

Ensure your root `.gitignore` contains the following:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Production build outputs
dist/
build/
coverage/

# Local Environment Variables & Secrets
.env
.env.local
.env.*.local
!.env.example

# Runtime & Debug Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS Specific Files
.DS_Store
Thumbs.db

# IDE & Editor configurations
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
```

> **Security Notice**: Never remove `.env` from `.gitignore`. Always use `.env.example` as the safe template for environment variables.

---

## Step 3: Generating & Configuring `README.md`

Every high-quality GitHub repository requires a well-structured `README.md`. It explains the problem statement, capabilities, stack, installation steps, and deployment routes to potential recruiters, evaluators, and contributors.

A ready-to-use `README.md` is provided in the repository root. If you need to generate one from scratch, see the [Template in README.md](README.md).

---

## Step 4: Initializing Local Git Repository

Navigate to your project root folder in your terminal:

```bash
# Check current directory
pwd

# 1. Initialize a new Git repository
git init

# 2. Check untracked files
git status

# 3. Stage all files (respecting .gitignore)
git add .

# 4. Commit the staged files
git commit -m "feat: initial commit - AI FORCE Capacity Connect LMS Portal"
```

---

## Step 5: Creating a Repository on GitHub

### Option A: Using the GitHub Web Interface
1. Go to [https://github.com/new](https://github.com/new).
2. Enter a repository name (e.g., `ai-force-capacity-connect` or `aiforce-lms`).
3. Add an optional description:  
   *AI-powered Digital Capacity Building and Learning Management Portal.*
4. Select **Public** (or **Private**).
5. **Crucial**: Do **NOT** check "Initialize this repository with a README", ".gitignore", or "license", because you already have them locally.
6. Click **Create repository**.

### Option B: Using GitHub CLI (`gh`)
If you have the [GitHub CLI](https://cli.github.com/) installed:
```bash
# Login if not already logged in
gh auth login

# Create a public repository from the current folder
gh repo create ai-force-capacity-connect --public --source=. --remote=origin --push
```

---

## Step 6: Linking Remote & Pushing to GitHub

Once your repository is created on GitHub, connect your local repository to it:

### Using HTTPS:
```bash
# Set branch name to 'main'
git branch -M main

# Link remote origin (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/ai-force-capacity-connect.git

# Verify remote configuration
git remote -v

# Push all files to main
git push -u origin main
```

### Using SSH:
```bash
git branch -M main
git remote add origin git@github.com:YOUR-USERNAME/ai-force-capacity-connect.git
git push -u origin main
```

> **Note on Authentication**: If prompted for a password when using HTTPS, GitHub requires a **Personal Access Token** instead of your account password. Generate one at **GitHub $\rightarrow$ Settings $\rightarrow$ Developer Settings $\rightarrow$ Personal Access Tokens**.

---

## Step 7: Production Deployment Options

### Option A: Google Cloud Run
1. **Direct Deploy**: In Google AI Studio, click the **Deploy** button in the top navigation to immediately launch a secure Cloud Run container.
2. **Automated CI/CD from GitHub**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/run).
   - Click **Create Service** $\rightarrow$ **Continuously deploy from a repository**.
   - Authenticate with GitHub and select `ai-force-capacity-connect`.
   - Build Type: Select **Google Cloud Buildpack** or **Docker**.
   - Cloud Run automatically deploys on every `git push origin main`.

### Option B: Vercel / Netlify / Cloudflare Pages
1. Import your GitHub repository in the Vercel or Netlify dashboard.
2. Set configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add any environment variables (e.g., `GEMINI_API_KEY`) under Project Settings.
4. Click **Deploy**.

---

## Step 8: In-App "Deploy to GitHub" Utility

For maximum convenience, an interactive deployment helper is built directly into `js/script.js`.

### How to use:
1. **From the Web UI**: Click the **"Deploy to GitHub"** button in the footer or navigation of any page.
2. **From the Browser Console**:
   Press `F12` (or right-click $\rightarrow$ *Inspect* $\rightarrow$ *Console*), and run:
   ```javascript
   deployToGitHubGuide();
   ```
   Or to get the step-by-step commands as a plain object:
   ```javascript
   console.log(deployToGitHubGuide.getCommands("your-username", "ai-force-capacity-connect"));
   ```
3. A modal opens allowing you to input your GitHub username and repository name, giving you instant one-click copyable bash commands.

---

## Troubleshooting & FAQs

### Q: `fatal: remote origin already exists`
Run:
```bash
git remote set-url origin https://github.com/YOUR-USERNAME/ai-force-capacity-connect.git
```

### Q: `error: failed to push some refs to ...`
This occurs if the remote repository has commits not present locally (e.g. if you initialized with a README on GitHub).
Fix by pulling with rebase:
```bash
git pull origin main --rebase
git push origin main
```

### Q: Git asks for credentials repeatedly on Windows or Mac
Enable the Git credential manager:
```bash
# Windows / macOS
git config --global credential.helper store
```

---

*AI FORCE Capacity Connect LMS — Built for institutional competency development, knowledge sharing, and enterprise skill scaling.*
