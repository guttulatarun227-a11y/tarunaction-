/**
 * AI FORCE - Courses & Course Details Engine
 * Handles catalog filtering, search, enrollment state, and lesson viewer.
 */

document.addEventListener("DOMContentLoaded", () => {
  const coursesGrid = document.getElementById("catalog-courses-grid");
  const searchInput = document.getElementById("course-search-input");
  const filterPills = document.querySelectorAll(".course-filter-pill");

  let allCourses = JSON.parse(localStorage.getItem("aiforce_courses") || "[]");
  let activeCategory = "All";
  let searchQuery = "";

  // Render Courses in Catalog
  function renderCourses() {
    if (!coursesGrid) return;

    const filtered = allCourses.filter(course => {
      const matchesCategory = activeCategory === "All" || course.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      coursesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--border-color);"></i>
          <h3>No courses found matching "${searchQuery}"</h3>
          <p style="margin-top: 0.5rem;">Try selecting another competency category or search term.</p>
        </div>
      `;
      return;
    }

    coursesGrid.innerHTML = filtered.map(course => `
      <div class="course-card" id="catalog-card-${course.id}">
        <div class="course-thumb-wrapper">
          <img src="${course.image}" alt="${course.title}" class="course-thumb" loading="lazy" />
          <span class="course-badge">${course.category}</span>
          <span class="course-difficulty diff-${course.difficulty.toLowerCase()}">${course.difficulty}</span>
        </div>
        <div class="course-body">
          <div class="course-category">${course.category}</div>
          <h3 class="course-title">${course.title}</h3>
          
          <div class="course-instructor">
            <div class="instructor-avatar" style="background:var(--primary-gradient);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">
              ${course.instructor.split(" ")[1] ? course.instructor.split(" ")[1].charAt(0) : 'T'}
            </div>
            <div>
              <div style="font-weight:700;font-size:0.88rem;">${course.instructor}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${course.instructorRole}</div>
            </div>
          </div>

          <div class="course-meta">
            <span class="course-meta-item"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
            <span class="course-meta-item"><i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${course.rating}</span>
            <span class="course-meta-item"><i class="fa-solid fa-user-graduate"></i> ${course.enrolledCount}</span>
          </div>

          <div class="course-progress-wrapper">
            <div class="progress-header">
              <span>Progress</span>
              <span>${course.isEnrolled ? course.progress + '%' : 'Not Enrolled'}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${course.isEnrolled ? course.progress : 0}%;"></div>
            </div>
          </div>

          <div class="course-footer">
            <a href="course-details.html?id=${course.id}" class="btn btn-secondary btn-sm">
              <i class="fa-solid fa-circle-info"></i> Details
            </a>
            ${course.isEnrolled ? `
              <a href="course-details.html?id=${course.id}" class="btn btn-primary btn-sm">
                <i class="fa-solid fa-play"></i> Continue
              </a>
            ` : `
              <button onclick="enrollCourse('${course.id}')" class="btn btn-primary btn-sm">
                <i class="fa-solid fa-plus"></i> Enroll Now
              </button>
            `}
          </div>
        </div>
      </div>
    `).join("");
  }

  // Enrollment Action
  window.enrollCourse = function(courseId) {
    allCourses = allCourses.map(c => {
      if (c.id === courseId) {
        return { ...c, isEnrolled: true, progress: 10 };
      }
      return c;
    });

    localStorage.setItem("aiforce_courses", JSON.stringify(allCourses));

    const user = JSON.parse(localStorage.getItem("aiforce_user") || "{}");
    if (!user.enrolledCourseIds) user.enrolledCourseIds = [];
    if (!user.enrolledCourseIds.includes(courseId)) {
      user.enrolledCourseIds.push(courseId);
    }
    localStorage.setItem("aiforce_user", JSON.stringify(user));

    window.showToast("Successfully enrolled in course!", "success");
    renderCourses();
  };

  // Category Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "All";
      renderCourses();
    });
  });

  // Search Input Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCourses();
    });
  }

  renderCourses();

  // Load Course Details Page if on course-details.html
  initCourseDetails();
});

function initCourseDetails() {
  const detailsContainer = document.getElementById("course-details-view");
  if (!detailsContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id") || "c1";

  const allCourses = JSON.parse(localStorage.getItem("aiforce_courses") || "[]");
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  if (!course) return;

  document.title = `${course.title} - AI FORCE Capacity Connect`;

  const detailsTitle = document.getElementById("cd-title");
  const detailsDesc = document.getElementById("cd-description");
  const detailsCategory = document.getElementById("cd-category");
  const detailsInstructor = document.getElementById("cd-instructor");
  const detailsDuration = document.getElementById("cd-duration");
  const detailsDifficulty = document.getElementById("cd-difficulty");
  const detailsEnrollBtn = document.getElementById("cd-enroll-btn");
  const detailsModules = document.getElementById("cd-modules-list");

  if (detailsTitle) detailsTitle.textContent = course.title;
  if (detailsDesc) detailsDesc.textContent = course.description;
  if (detailsCategory) detailsCategory.textContent = course.category;
  if (detailsInstructor) detailsInstructor.textContent = course.instructor;
  if (detailsDuration) detailsDuration.textContent = course.duration;
  if (detailsDifficulty) {
    detailsDifficulty.textContent = course.difficulty;
    detailsDifficulty.className = `course-difficulty diff-${course.difficulty.toLowerCase()}`;
  }

  if (detailsEnrollBtn) {
    if (course.isEnrolled) {
      detailsEnrollBtn.innerHTML = '<i class="fa-solid fa-play"></i> Continue Learning (Resume Module)';
      detailsEnrollBtn.onclick = () => window.showToast("Resuming current module lesson...", "info");
    } else {
      detailsEnrollBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Enroll in Competency Track';
      detailsEnrollBtn.onclick = () => {
        window.enrollCourse(course.id);
        detailsEnrollBtn.innerHTML = '<i class="fa-solid fa-play"></i> Continue Learning (Resume Module)';
      };
    }
  }

  if (detailsModules && course.modules) {
    detailsModules.innerHTML = course.modules.map((mod, idx) => `
      <div class="module-accordion-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);margin-bottom:0.85rem;overflow:hidden;">
        <div style="padding:1.15rem 1.25rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background:var(--bg-secondary);" onclick="this.parentElement.querySelector('.module-content').classList.toggle('hidden')">
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="width:28px;height:28px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">${idx + 1}</span>
            <span style="font-weight:700;font-size:0.95rem;">${mod.title}</span>
          </div>
          <div style="display:flex;align-items:center;gap:0.85rem;font-size:0.85rem;color:var(--text-muted);">
            <span><i class="fa-regular fa-file-video"></i> ${mod.lessons} lessons</span>
            <span><i class="fa-regular fa-clock"></i> ${mod.duration}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div class="module-content ${idx === 0 ? '' : 'hidden'}" style="padding:1rem 1.25rem;border-top:1px solid var(--border-color);font-size:0.88rem;">
          <ul style="display:flex;flex-direction:column;gap:0.65rem;">
            <li style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0;border-bottom:1px dashed var(--border-color);">
              <span><i class="fa-solid fa-circle-play" style="color:var(--primary);margin-right:0.5rem;"></i> Concept Architecture & Key Terminology</span>
              <span class="btn btn-sm btn-secondary" onclick="window.showToast('Playing lecture preview video...', 'info')">Preview</span>
            </li>
            <li style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0;border-bottom:1px dashed var(--border-color);">
              <span><i class="fa-solid fa-circle-play" style="color:var(--primary);margin-right:0.5rem;"></i> Hands-On Implementation Lab</span>
              <span style="color:var(--text-muted);font-size:0.8rem;">18 mins</span>
            </li>
            <li style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0;">
              <span><i class="fa-solid fa-file-lines" style="color:var(--secondary);margin-right:0.5rem;"></i> Knowledge Check & Competency Review</span>
              <a href="assessments.html" class="btn btn-sm btn-outline">Start Quiz</a>
            </li>
          </ul>
        </div>
      </div>
    `).join("");
  }
}
