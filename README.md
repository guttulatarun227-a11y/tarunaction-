# AI FORCE – Capacity Connect LMS Portal

> **Digital Capacity Building and Learning Management Portal** designed to support organizational training, institutional competency development, and AI-accelerated knowledge sharing.

[![Deployment Guide](https://img.shields.io/badge/Guide-GitHub%20Deployment-blue.svg)](DEPLOYMENT_GUIDE.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Built With](https://img.shields.io/badge/Tech-Vite%20%7C%20TypeScript%20%7C%20Tailwind-indigo.svg)](package.json)

---

## 🌟 Key Capabilities

- **Interactive Competency Catalog**: Modular enterprise courses covering Generative AI, Cloud Microservices, Machine Learning, Cybersecurity, and Executive Leadership.
- **AI Doubt & Mentorship Assistant**: Multi-modal chat assistant with contextual suggestions, doubt escalation, and concept synthesizers.
- **Live Collaborative Classrooms**: Stream schedules, interactive attendee Q&A, whiteboard sync, and attendance validation.
- **Continuous Knowledge Assessments**: Multi-format timed quizzes, instant performance scoring, and competency progress tracking.
- **Digital Credentialing & Certificates**: Verifiable digital certification with PDF/image download and verification hashes.
- **Faculty & Admin Portal**: Institutional analytics, course management, student progress monitoring, and activity audits.
- **Dark / Light Mode**: Eye-safe high-contrast themes conforming to WCAG standards with instant local persistence.
- **Built-in GitHub Deployment Helper**: In-app terminal command generator and step-by-step export tools.

---

## 🚀 Quick Start (Local Development)

### 1. Clone or Extract the Project
```bash
git clone https://github.com/<YOUR-USERNAME>/ai-force-capacity-connect.git
cd ai-force-capacity-connect
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will boot at `http://localhost:3000`.

### 4. Start the Backend API
In a second terminal, run:
```bash
npm run server
```
The Express API runs at `http://localhost:4000`. When the Vite server is running, frontend `/api` requests are proxied automatically.

To use Supabase Auth, copy `.env.example` to `.env` and set `SUPABASE_URL` and `SUPABASE_ANON_KEY`. Without those values, the API uses its local development user store.

### 5. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory ready for deployment.

---

## 📦 Deployment to GitHub & Cloud

For a complete step-by-step guide with terminal commands, `.gitignore` setup, and hosting options (Cloud Run, Vercel, Netlify):

👉 **[Read the Full Deployment Guide (DEPLOYMENT_GUIDE.md)](DEPLOYMENT_GUIDE.md)**

### Rapid 1-Minute GitHub Setup:
```bash
# 1. Initialize git
git init

# 2. Stage and commit files
git add .
git commit -m "feat: initial commit - AI FORCE Capacity Connect"

# 3. Rename branch & link to your new GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

# 4. Push code
git push -u origin main
```

---

## 📁 Repository Structure

```text
├── index.html            # Main Portal landing page
├── courses.html          # Course catalog & filters
├── course-details.html   # Detailed syllabus & enrollment
├── ai-assistant.html     # AI Assistant interface
├── live-classes.html     # Virtual classroom schedules & webinars
├── assessments.html      # Skill evaluation & quiz engine
├── dashboard.html        # Learner analytics & progress
├── certificates.html     # Verifiable credentials
├── profile.html          # User profile settings
├── admin.html            # Administrator & faculty portal
├── login.html            # Authentication login
├── register.html         # User sign-up & role selection
├── DEPLOYMENT_GUIDE.md   # Step-by-step GitHub deployment manual
├── css/
│   └── style.css         # Design system & theme styles
├── js/
│   ├── script.js         # Core global logic & GitHub deploy helper
│   ├── auth.js           # Authentication & local state
│   ├── courses.js        # Catalog & enrollment state
│   ├── dashboard.js      # Student dashboard & charts
│   ├── ai-assistant.js   # AI chat & doubt clearing
│   ├── live-classes.js   # Live webinar session manager
│   └── admin.js          # Admin dashboard & analytics
└── vite.config.ts        # Vite configuration
```

---

## 🛠️ Tech Stack

- **Frontend Core**: Vanilla TypeScript / ES Modules, HTML5, Modern CSS Variables
- **Build Engine**: Vite 6, Node.js
- **Design System**: Tailwind CSS & Custom Design Tokens with Dark/Light Mode
- **Icons & Typography**: Font Awesome 6, Plus Jakarta Sans
- **State Management**: Reactive LocalStorage state with cross-tab persistence

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
