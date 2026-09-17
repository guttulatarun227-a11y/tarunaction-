/**
 * AI FORCE - Central Portal Script
 * Handles global initialization, Theme Toggle (Light/Dark), Mobile Hamburger,
 * LocalStorage Demo Seed Data, and Auth State in Navigation.
 */

// Initial Seed Data for Demo & Capacity Connect LMS
const DEFAULT_COURSES = [
  {
    id: "c1",
    title: "Generative AI & Prompt Engineering for Enterprise",
    category: "Artificial Intelligence",
    instructor: "Dr. Anya Sharma",
    instructorRole: "Principal AI Scientist",
    duration: "14 Hours",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolledCount: 3420,
    progress: 75,
    isEnrolled: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    description: "Master LLM orchestration, chain-of-thought prompting, RAG architectures, and AI ethics for scalable enterprise capacity building.",
    modules: [
      { title: "Module 1: Foundations of Foundation Models & Transformers", lessons: 4, duration: "2h 30m" },
      { title: "Module 2: Advanced Prompt Engineering & Few-Shot Learning", lessons: 6, duration: "3h 45m" },
      { title: "Module 3: Retrieval-Augmented Generation (RAG) Systems", lessons: 5, duration: "4h 15m" },
      { title: "Module 4: Enterprise Safety, Guardrails & Deployment", lessons: 4, duration: "3h 30m" }
    ]
  },
  {
    id: "c2",
    title: "Cloud Native Microservices with Kubernetes",
    category: "Cloud Computing",
    instructor: "Vikram Malhotra",
    instructorRole: "Cloud Architect, Google Cloud",
    duration: "18 Hours",
    difficulty: "Advanced",
    rating: 4.8,
    enrolledCount: 2890,
    progress: 40,
    isEnrolled: true,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    description: "Build robust, auto-scaling distributed systems using Docker, Kubernetes clusters, service meshes, and CI/CD pipelines.",
    modules: [
      { title: "Module 1: Containerization & Docker Engine", lessons: 5, duration: "3h 00m" },
      { title: "Module 2: Kubernetes Cluster Architecture & Pods", lessons: 7, duration: "5h 15m" },
      { title: "Module 3: Ingress, Helm & Service Meshes", lessons: 6, duration: "4h 45m" },
      { title: "Module 4: Production Reliability & GitOps", lessons: 5, duration: "5h 00m" }
    ]
  },
  {
    id: "c3",
    title: "Applied Machine Learning & Deep Neural Networks",
    category: "Data Science",
    instructor: "Dr. Sarah Jenkins",
    instructorRole: "Deep Learning Researcher",
    duration: "22 Hours",
    difficulty: "Advanced",
    rating: 4.95,
    enrolledCount: 4150,
    progress: 100,
    isEnrolled: true,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    description: "Supervised and unsupervised learning, PyTorch fundamentals, CNNs for computer vision, and transformers.",
    modules: [
      { title: "Module 1: Mathematical Foundations & Gradient Descent", lessons: 6, duration: "4h 00m" },
      { title: "Module 2: Deep Feedforward Networks in PyTorch", lessons: 8, duration: "6h 30m" },
      { title: "Module 3: Convolutional Neural Networks (CNNs)", lessons: 7, duration: "5h 30m" },
      { title: "Module 4: Transformer Architecture & Sequence Models", lessons: 6, duration: "6h 00m" }
    ]
  },
  {
    id: "c4",
    title: "Cybersecurity Defense & Zero-Trust Architecture",
    category: "Cybersecurity",
    instructor: "Col. Rajesh Verma",
    instructorRole: "Chief Information Security Officer",
    duration: "12 Hours",
    difficulty: "Intermediate",
    rating: 4.75,
    enrolledCount: 1980,
    progress: 15,
    isEnrolled: true,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    description: "Protect institutional infrastructure, implement NIST cybersecurity framework, threat hunting, and modern Zero-Trust access.",
    modules: [
      { title: "Module 1: Threat Landscape & Attack Vectors", lessons: 4, duration: "2h 30m" },
      { title: "Module 2: Zero-Trust Identity & Access Management", lessons: 5, duration: "3h 30m" },
      { title: "Module 3: Network Hardening & Incident Response", lessons: 5, duration: "3h 30m" },
      { title: "Module 4: Compliance & Digital Forensics", lessons: 4, duration: "2h 30m" }
    ]
  },
  {
    id: "c5",
    title: "Executive Leadership & Strategic Knowledge Sharing",
    category: "Leadership",
    instructor: "Elena Rostova",
    instructorRole: "Global Talent Strategist",
    duration: "8 Hours",
    difficulty: "Beginner",
    rating: 4.88,
    enrolledCount: 1650,
    progress: 0,
    isEnrolled: false,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Equip managers with skills to foster cross-functional collaboration, mentoring cultures, and organizational resilience.",
    modules: [
      { title: "Module 1: The Modern Knowledge-Driven Enterprise", lessons: 3, duration: "2h 00m" },
      { title: "Module 2: Psychological Safety & Peer Coaching", lessons: 4, duration: "2h 30m" },
      { title: "Module 3: Competency Framework Mapping", lessons: 3, duration: "2h 00m" },
      { title: "Module 4: Change Management & Continuous Upskilling", lessons: 3, duration: "1h 30m" }
    ]
  },
  {
    id: "c6",
    title: "Full-Stack Web Development with React & Node.js",
    category: "Software Engineering",
    instructor: "Arjun Mehta",
    instructorRole: "Lead Full-Stack Engineer",
    duration: "20 Hours",
    difficulty: "Intermediate",
    rating: 4.82,
    enrolledCount: 5200,
    progress: 0,
    isEnrolled: false,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    description: "Modern JavaScript, React functional components, state machines, REST/GraphQL APIs, Express server, and database connectivity.",
    modules: [
      { title: "Module 1: Modern JS & Asynchronous Architecture", lessons: 6, duration: "4h 00m" },
      { title: "Module 2: React Core Hooks & Component State", lessons: 8, duration: "6h 00m" },
      { title: "Module 3: Server APIs & Backend Routing", lessons: 7, duration: "5h 00m" },
      { title: "Module 4: Database Integration & Production Deployment", lessons: 6, duration: "5h 00m" }
    ]
  }
];

const DEFAULT_USER = {
  fullName: "Aarav Sharma",
  email: "student@aiforce.edu",
  studentId: "AF-2026-9812",
  department: "Artificial Intelligence & Data Science",
  mobile: "+91 98765 43210",
  role: "Student",
  bio: "Aspiring AI practitioner committed to continuous capacity development and digital learning transformation.",
  enrolledCourseIds: ["c1", "c2", "c3", "c4"],
  completedCourseIds: ["c3"],
  hoursLearned: 38,
  overallProgress: 72,
  certificates: [
    {
      id: "CERT-AI-88392",
      courseId: "c3",
      courseTitle: "Applied Machine Learning & Deep Neural Networks",
      issuedDate: "September 12, 2026",
      score: "96%"
    }
  ]
};

// Seed LocalStorage if not exists
function initStorage() {
  if (!localStorage.getItem("aiforce_courses")) {
    localStorage.setItem("aiforce_courses", JSON.stringify(DEFAULT_COURSES));
  }
  if (!localStorage.getItem("aiforce_user")) {
    localStorage.setItem("aiforce_user", JSON.stringify(DEFAULT_USER));
  }
  if (!localStorage.getItem("aiforce_theme")) {
    localStorage.setItem("aiforce_theme", "light");
  }
}

// Theme Handling
function initTheme() {
  const currentTheme = localStorage.getItem("aiforce_theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcons(currentTheme);

  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("aiforce_theme", nextTheme);
      updateThemeIcons(nextTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll(".theme-toggle-btn i");
  icons.forEach(icon => {
    if (theme === "dark") {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  });
}

// Mobile Hamburger Menu Handling
function initMobileMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const backdrop = document.querySelector(".nav-backdrop");

  if (!hamburgerBtn || !mobileDrawer) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains("open");
    if (isOpen) {
      mobileDrawer.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      hamburgerBtn.setAttribute("aria-expanded", "false");
    } else {
      mobileDrawer.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      hamburgerBtn.setAttribute("aria-expanded", "true");
    }
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  if (backdrop) {
    backdrop.addEventListener("click", toggleMenu);
  }

  // Close when clicking any mobile nav link
  const links = mobileDrawer.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileDrawer.classList.contains("open")) {
        toggleMenu();
      }
    });
  });
}

// Highlight Current Page Nav Link
function highlightActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";

  const allNavLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .sidebar-link");
  allNavLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Render dynamic user state in headers / nav
function updateNavUserState() {
  const user = JSON.parse(localStorage.getItem("aiforce_user") || "null");
  const authNavActions = document.querySelectorAll(".nav-auth-actions");

  authNavActions.forEach(container => {
    if (user) {
      container.innerHTML = `
        <a href="dashboard.html" class="btn btn-secondary btn-sm" id="nav-btn-dashboard">
          <i class="fa-solid fa-gauge-high"></i> Dashboard
        </a>
        <a href="profile.html" class="user-pill-btn" id="nav-btn-profile" title="My Profile" style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.65rem;border-radius:9999px;border:1px solid var(--border-color);background:var(--bg-secondary);font-weight:600;font-size:0.88rem;">
          <span style="width:28px;height:28px;border-radius:50%;background:var(--primary-gradient);color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;">${user.fullName ? user.fullName.charAt(0) : 'U'}</span>
          <span>${user.fullName ? user.fullName.split(' ')[0] : 'User'}</span>
        </a>
      `;
    } else {
      container.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm" id="nav-btn-login">Login</a>
        <a href="register.html" class="btn btn-primary btn-sm" id="nav-btn-register">Register</a>
      `;
    }
  });
}

// Global Toast System
window.showToast = function(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// =========================================================================
// 'Deploy to GitHub' Utility & Interactive Terminal Generator
// =========================================================================

/**
 * Explains how to initialize a Git repository, configure .gitignore and README.md,
 * and push the AI FORCE Capacity Connect project to a new GitHub repository.
 * Can be called via console: `deployToGitHubGuide()` or `window.deployToGitHub()`
 * or triggered via UI buttons.
 *
 * @param {Object} options - Optional configuration { username, repoName, autoOpenModal }
 * @returns {Object} Structured commands, .gitignore rules, and README template
 */
function deployToGitHubGuide(options = {}) {
  const defaultUsername = options.username || "your-github-username";
  const defaultRepo = options.repoName || "ai-force-capacity-connect";
  const shouldOpenModal = options.autoOpenModal !== false;

  const gitignoreContent = `# Dependencies
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
.env*
!.env.example

# Logs & Debug
*.log
npm-debug.log*

# Editor & OS
.DS_Store
Thumbs.db
.vscode/*
!.vscode/extensions.json
.idea/`;

  const readmeTemplate = `# AI FORCE – Capacity Connect LMS Portal

> Digital Capacity Building and Learning Management Portal designed to support organizational training, institutional competency development, and knowledge sharing.

## Quick Start
1. \`npm install\`
2. \`npm run dev\`
3. Production build: \`npm run build\`

For detailed instructions, see \`DEPLOYMENT_GUIDE.md\`.`;

  const commands = {
    step1_init: "git init",
    step2_gitignore: "cat << 'EOF' > .gitignore\n" + gitignoreContent + "\nEOF",
    step3_readme: "cat << 'EOF' > README.md\n" + readmeTemplate + "\nEOF",
    step4_commit: 'git add .\ngit commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"',
    step5_branch: "git branch -M main",
    step6_remote: `git remote add origin https://github.com/${defaultUsername}/${defaultRepo}.git`,
    step7_push: "git push -u origin main",
    allInOne: `# 1. Initialize repository
git init

# 2. Stage and commit all project files
git add .
git commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"

# 3. Configure branch and GitHub remote
git branch -M main
git remote add origin https://github.com/${defaultUsername}/${defaultRepo}.git

# 4. Push to GitHub
git push -u origin main`
  };

  // Console output with stylish styling
  console.log(
    "%c🚀 AI FORCE – Deploy to GitHub Guide",
    "font-size: 16px; font-weight: bold; color: #4f46e5; background: #e0e7ff; padding: 4px 8px; border-radius: 4px;"
  );
  console.log(
    "%cFollow these terminal commands to initialize git and push to GitHub:",
    "font-size: 12px; color: #334155; font-style: italic;"
  );
  console.log(`\n%c1. Initialize Git:\n%cgit init`, "font-weight:bold;color:#1e293b", "color:#059669;font-family:monospace");
  console.log(`\n%c2. Stage & Commit:\n%cgit add .\ngit commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"`, "font-weight:bold;color:#1e293b", "color:#059669;font-family:monospace");
  console.log(`\n%c3. Set Main Branch:\n%cgit branch -M main`, "font-weight:bold;color:#1e293b", "color:#059669;font-family:monospace");
  console.log(`\n%c4. Link Remote (replace username/repo):\n%cgit remote add origin https://github.com/${defaultUsername}/${defaultRepo}.git`, "font-weight:bold;color:#1e293b", "color:#059669;font-family:monospace");
  console.log(`\n%c5. Push to GitHub:\n%cgit push -u origin main`, "font-weight:bold;color:#1e293b", "color:#059669;font-family:monospace");
  console.log("\n%c💡 Tip: You can also use AI Studio's top-right 'Export to GitHub' menu directly!", "color:#6366f1;font-weight:600");

  if (shouldOpenModal && typeof document !== "undefined") {
    renderGitHubDeployModal(defaultUsername, defaultRepo);
  }

  return {
    username: defaultUsername,
    repoName: defaultRepo,
    commands,
    gitignoreContent,
    readmeTemplate
  };
}

// Static helper to generate custom command strings on the fly
deployToGitHubGuide.getCommands = function(username = "your-github-username", repo = "ai-force-capacity-connect") {
  return {
    init: "git init",
    stageAndCommit: 'git add .\ngit commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"',
    branch: "git branch -M main",
    remote: `git remote add origin https://github.com/${username}/${repo}.git`,
    push: "git push -u origin main",
    allInOne: `git init\ngit add .\ngit commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"\ngit branch -M main\ngit remote add origin https://github.com/${username}/${repo}.git\ngit push -u origin main`
  };
};

/**
 * Renders an interactive modal in the browser for visual inspection and 1-click copying.
 */
function renderGitHubDeployModal(initialUser, initialRepo) {
  let existingModal = document.getElementById("github-deploy-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modalHtml = `
    <div class="modal-backdrop show" id="github-deploy-modal" style="display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,0.7);backdrop-filter:blur(6px);z-index:99999;padding:1rem;overflow-y:auto;">
      <div class="modal-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-lg);max-width:760px;width:100%;box-shadow:var(--shadow-lg);padding:1.75rem;position:relative;margin:auto;">
        
        <!-- Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;border-bottom:1px solid var(--border-color);padding-bottom:1rem;">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <div style="width:42px;height:42px;border-radius:10px;background:#24292e;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">
              <i class="fa-brands fa-github"></i>
            </div>
            <div>
              <h3 style="margin:0;font-size:1.25rem;font-weight:700;color:var(--text-primary);">Deploy to GitHub Guide</h3>
              <p style="margin:0;font-size:0.85rem;color:var(--text-secondary);">Initialize local git repo, configure assets, and push to GitHub</p>
            </div>
          </div>
          <button id="close-github-modal-btn" aria-label="Close modal" style="background:transparent;border:none;color:var(--text-muted);font-size:1.25rem;cursor:pointer;padding:0.25rem 0.5rem;border-radius:6px;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Quick AI Studio Tip Banner -->
        <div style="background:var(--primary-light);border:1px solid rgba(79,70,229,0.3);border-radius:var(--radius-md);padding:0.85rem 1rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:0.75rem;">
          <i class="fa-solid fa-wand-magic-sparkles" style="color:var(--primary);font-size:1.15rem;flex-shrink:0;"></i>
          <div style="font-size:0.85rem;color:var(--text-primary);">
            <strong>Fastest Route:</strong> You can also use AI Studio's top header menu <strong>"Settings &rarr; Export to GitHub"</strong> for automatic 1-click repository creation.
          </div>
        </div>

        <!-- Repository Customizer Form -->
        <div style="background:var(--bg-secondary);padding:1rem;border-radius:var(--radius-md);border:1px solid var(--border-color);margin-bottom:1.25rem;">
          <label style="font-size:0.85rem;font-weight:700;color:var(--text-primary);display:block;margin-bottom:0.5rem;">
            <i class="fa-solid fa-sliders"></i> Customize Your GitHub Parameters:
          </label>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:0.75rem;">
            <div>
              <span style="font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">GitHub Username / Org:</span>
              <input type="text" id="gh-modal-username" value="${initialUser}" placeholder="e.g. your-github-username" 
                style="width:100%;padding:0.45rem 0.75rem;border:1px solid var(--border-color);border-radius:6px;background:var(--bg-card);color:var(--text-primary);font-size:0.88rem;" />
            </div>
            <div>
              <span style="font-size:0.78rem;color:var(--text-muted);display:block;margin-bottom:0.25rem;">Repository Name:</span>
              <input type="text" id="gh-modal-reponame" value="${initialRepo}" placeholder="e.g. ai-force-capacity-connect" 
                style="width:100%;padding:0.45rem 0.75rem;border:1px solid var(--border-color);border-radius:6px;background:var(--bg-card);color:var(--text-primary);font-size:0.88rem;" />
            </div>
          </div>
        </div>

        <!-- Step-by-Step Commands -->
        <div style="display:flex;flex-direction:column;gap:1rem;max-height:360px;overflow-y:auto;padding-right:0.25rem;">
          
          <!-- Step 1 & 2 -->
          <div style="border:1px solid var(--border-color);border-radius:8px;padding:0.85rem;background:var(--bg-card);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">
                <span style="background:var(--primary);color:#fff;font-size:0.75rem;padding:2px 7px;border-radius:99px;margin-right:0.35rem;">1</span>
                Initialize Git & Verify Setup Files
              </span>
              <button class="btn-copy-cmd" data-target="cmd-block-1" style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;padding:2px 8px;font-size:0.75rem;cursor:pointer;color:var(--text-primary);">
                <i class="fa-regular fa-copy"></i> Copy
              </button>
            </div>
            <p style="font-size:0.78rem;color:var(--text-secondary);margin:0 0 0.5rem 0;">
              Ensures <code>.gitignore</code> (ignoring <code>node_modules/</code> & <code>.env*</code>) and <code>README.md</code> are properly respected.
            </p>
            <pre id="cmd-block-1" style="background:#0f172a;color:#38bdf8;padding:0.5rem 0.75rem;border-radius:6px;font-size:0.8rem;font-family:monospace;margin:0;overflow-x:auto;">git init</pre>
          </div>

          <!-- Step 3: Stage & Commit -->
          <div style="border:1px solid var(--border-color);border-radius:8px;padding:0.85rem;background:var(--bg-card);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">
                <span style="background:var(--primary);color:#fff;font-size:0.75rem;padding:2px 7px;border-radius:99px;margin-right:0.35rem;">2</span>
                Stage & Commit All Files
              </span>
              <button class="btn-copy-cmd" data-target="cmd-block-2" style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;padding:2px 8px;font-size:0.75rem;cursor:pointer;color:var(--text-primary);">
                <i class="fa-regular fa-copy"></i> Copy
              </button>
            </div>
            <pre id="cmd-block-2" style="background:#0f172a;color:#38bdf8;padding:0.5rem 0.75rem;border-radius:6px;font-size:0.8rem;font-family:monospace;margin:0;overflow-x:auto;">git add .
git commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"</pre>
          </div>

          <!-- Step 4: Link & Push -->
          <div style="border:1px solid var(--border-color);border-radius:8px;padding:0.85rem;background:var(--bg-card);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">
                <span style="background:var(--primary);color:#fff;font-size:0.75rem;padding:2px 7px;border-radius:99px;margin-right:0.35rem;">3</span>
                Link Remote & Push to GitHub
              </span>
              <button class="btn-copy-cmd" data-target="cmd-block-3" style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:4px;padding:2px 8px;font-size:0.75rem;cursor:pointer;color:var(--text-primary);">
                <i class="fa-regular fa-copy"></i> Copy
              </button>
            </div>
            <pre id="cmd-block-3" style="background:#0f172a;color:#38bdf8;padding:0.5rem 0.75rem;border-radius:6px;font-size:0.8rem;font-family:monospace;margin:0;overflow-x:auto;">git branch -M main
git remote add origin https://github.com/${initialUser}/${initialRepo}.git
git push -u origin main</pre>
          </div>

          <!-- All in One Script -->
          <div style="border:1px solid var(--primary);background:var(--bg-secondary);border-radius:8px;padding:0.85rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--primary);">
                <i class="fa-solid fa-terminal"></i> All-In-One Copy (Full Script)
              </span>
              <button class="btn-copy-cmd" data-target="cmd-block-all" style="background:var(--primary);color:#fff;border:none;border-radius:4px;padding:3px 10px;font-size:0.78rem;cursor:pointer;font-weight:600;">
                <i class="fa-regular fa-copy"></i> Copy Script
              </button>
            </div>
            <pre id="cmd-block-all" style="background:#0f172a;color:#4ade80;padding:0.6rem 0.75rem;border-radius:6px;font-size:0.78rem;font-family:monospace;margin:0;overflow-x:auto;">git init
git add .
git commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"
git branch -M main
git remote add origin https://github.com/${initialUser}/${initialRepo}.git
git push -u origin main</pre>
          </div>

        </div>

        <!-- Footer Actions -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1.25rem;border-top:1px solid var(--border-color);padding-top:1rem;flex-wrap:wrap;gap:0.5rem;">
          <a href="DEPLOYMENT_GUIDE.md" target="_blank" style="font-size:0.85rem;color:var(--primary);font-weight:600;display:flex;align-items:center;gap:0.4rem;text-decoration:none;">
            <i class="fa-solid fa-book"></i> Open DEPLOYMENT_GUIDE.md
          </a>
          <button id="close-github-modal-btn2" class="btn btn-secondary btn-sm">
            Done
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalEl = document.getElementById("github-deploy-modal");
  const userInput = document.getElementById("gh-modal-username");
  const repoInput = document.getElementById("gh-modal-reponame");
  const cmdBlock3 = document.getElementById("cmd-block-3");
  const cmdBlockAll = document.getElementById("cmd-block-all");

  function updateCommands() {
    const user = userInput.value.trim() || "your-username";
    const repo = repoInput.value.trim() || "ai-force-capacity-connect";

    cmdBlock3.textContent = `git branch -M main\ngit remote add origin https://github.com/${user}/${repo}.git\ngit push -u origin main`;

    cmdBlockAll.textContent = `git init\ngit add .\ngit commit -m "feat: initial commit - AI FORCE Capacity Connect LMS"\ngit branch -M main\ngit remote add origin https://github.com/${user}/${repo}.git\ngit push -u origin main`;
  }

  userInput.addEventListener("input", updateCommands);
  repoInput.addEventListener("input", updateCommands);

  // Copy Buttons handler
  modalEl.querySelectorAll(".btn-copy-cmd").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent).then(() => {
          if (window.showToast) {
            window.showToast("Command copied to clipboard!", "success");
          }
          const origText = btn.innerHTML;
          btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
          setTimeout(() => {
            btn.innerHTML = origText;
          }, 2000);
        }).catch(() => {
          if (window.showToast) {
            window.showToast("Failed to copy automatically. Please copy manually.", "error");
          }
        });
      }
    });
  });

  // Close handlers
  const closeModal = () => modalEl.remove();
  document.getElementById("close-github-modal-btn")?.addEventListener("click", closeModal);
  document.getElementById("close-github-modal-btn2")?.addEventListener("click", closeModal);
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) closeModal();
  });
  document.addEventListener("keydown", function escListener(e) {
    if (e.key === "Escape" && document.getElementById("github-deploy-modal")) {
      closeModal();
      document.removeEventListener("keydown", escListener);
    }
  });
}

// Attach globally to window
window.deployToGitHubGuide = deployToGitHubGuide;
window.deployToGitHub = deployToGitHubGuide;
window.showGitHubDeployModal = () => deployToGitHubGuide({ autoOpenModal: true });

// Attach event listeners to any UI trigger elements on page
function initGitHubDeployTriggers() {
  document.querySelectorAll("[data-action='deploy-to-github'], .deploy-github-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.deployToGitHubGuide();
    });
  });
}

// Initialize Everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initTheme();
  initMobileMenu();
  highlightActiveNav();
  updateNavUserState();
  initGitHubDeployTriggers();
});

