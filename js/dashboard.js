/**
 * AI FORCE - Dashboard Script
 * Renders live metrics, competency progress, enrolled courses, and sidebar drawer logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Sidebar Toggle
  const menuToggleBtn = document.getElementById("dashboard-menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
  const sidebarCloseBtn = document.querySelector(".sidebar-close-btn");

  function toggleSidebar() {
    if (sidebar) sidebar.classList.toggle("open");
    if (sidebarBackdrop) sidebarBackdrop.classList.toggle("open");
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", toggleSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", toggleSidebar);

  // Load User Info
  const user = JSON.parse(localStorage.getItem("aiforce_user") || "{}");
  const courses = JSON.parse(localStorage.getItem("aiforce_courses") || "[]");

  const welcomeNameElem = document.getElementById("welcome-user-name");
  const sidebarUserName = document.getElementById("sidebar-user-name");
  const sidebarUserRole = document.getElementById("sidebar-user-role");
  const sidebarUserAvatar = document.getElementById("sidebar-user-avatar");

  if (welcomeNameElem && user.fullName) {
    welcomeNameElem.textContent = user.fullName.split(" ")[0];
  }
  if (sidebarUserName && user.fullName) {
    sidebarUserName.textContent = user.fullName;
  }
  if (sidebarUserRole && user.role) {
    sidebarUserRole.textContent = user.role;
  }
  if (sidebarUserAvatar && user.fullName) {
    sidebarUserAvatar.textContent = user.fullName.charAt(0);
  }

  // Calculate & Populate Stats
  const enrolledCourses = courses.filter(c => c.isEnrolled);
  const completedCourses = courses.filter(c => c.progress === 100);
  const inProgressCourses = courses.filter(c => c.isEnrolled && c.progress < 100);

  const statEnrolled = document.getElementById("stat-enrolled-count");
  const statCompleted = document.getElementById("stat-completed-count");
  const statInProgress = document.getElementById("stat-progress-count");
  const statOverall = document.getElementById("stat-overall-percentage");

  if (statEnrolled) statEnrolled.textContent = enrolledCourses.length || "12";
  if (statCompleted) statCompleted.textContent = completedCourses.length || "05";
  if (statInProgress) statInProgress.textContent = inProgressCourses.length || "03";
  if (statOverall) statOverall.textContent = (user.overallProgress || 72) + "%";

  // Render Enrolled Courses Cards in Dashboard
  const enrolledGrid = document.getElementById("dashboard-enrolled-courses");
  if (enrolledGrid) {
    const list = enrolledCourses.length > 0 ? enrolledCourses.slice(0, 3) : courses.slice(0, 3);
    enrolledGrid.innerHTML = list.map(course => `
      <div class="course-card" id="card-${course.id}">
        <div class="course-thumb-wrapper">
          <img src="${course.image}" alt="${course.title}" class="course-thumb" loading="lazy" />
          <span class="course-badge">${course.category}</span>
          <span class="course-difficulty diff-${course.difficulty.toLowerCase()}">${course.difficulty}</span>
        </div>
        <div class="course-body">
          <h3 class="course-title">${course.title}</h3>
          <div class="course-meta">
            <span class="course-meta-item"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
            <span class="course-meta-item"><i class="fa-solid fa-star" style="color:#f59e0b;"></i> ${course.rating}</span>
          </div>
          <div class="course-progress-wrapper">
            <div class="progress-header">
              <span>Competency Progress</span>
              <span>${course.progress}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${course.progress}%;"></div>
            </div>
          </div>
          <div class="course-footer">
            <a href="course-details.html?id=${course.id}" class="btn btn-primary btn-sm" style="width:100%;">
              <i class="fa-solid fa-play"></i> Resume Learning
            </a>
          </div>
        </div>
      </div>
    `).join("");
  }
});
