/**
 * AI FORCE - Admin Engine
 * Handles Course CRUD, Student Management, Assessment Authoring, and Reports.
 */

document.addEventListener("DOMContentLoaded", () => {
  let courses = JSON.parse(localStorage.getItem("aiforce_courses") || "[]");

  // Tab Switching
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  const tabPanels = document.querySelectorAll(".admin-tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.add("hidden"));

      btn.classList.add("active");
      const activePanel = document.getElementById(`panel-${target}`);
      if (activePanel) activePanel.classList.remove("hidden");
    });
  });

  // Render Admin Courses Table
  function renderAdminCourses() {
    const tableBody = document.getElementById("admin-courses-tbody");
    if (!tableBody) return;

    tableBody.innerHTML = courses.map(course => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <img src="${course.image}" alt="${course.title}" style="width:48px;height:48px;border-radius:var(--radius-sm);object-fit:cover;" />
            <div>
              <div style="font-weight:700;color:var(--text-primary);">${course.title}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);">${course.duration} • ${course.modules ? course.modules.length : 4} Modules</div>
            </div>
          </div>
        </td>
        <td><span class="badge-status badge-active">${course.category}</span></td>
        <td>${course.instructor}</td>
        <td><span class="badge-status badge-${course.difficulty === 'Advanced' ? 'pending' : 'active'}">${course.difficulty}</span></td>
        <td><strong>${course.enrolledCount}</strong></td>
        <td>
          <div class="action-buttons-group">
            <button class="btn-action-icon" title="Edit Course" onclick="openEditCourseModal('${course.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-action-icon delete" title="Delete Course" onclick="deleteCourse('${course.id}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    // Update stats summary in admin panel
    const totalCoursesElem = document.getElementById("admin-total-courses");
    const totalEnrollmentsElem = document.getElementById("admin-total-enrollments");
    if (totalCoursesElem) totalCoursesElem.textContent = courses.length;
    if (totalEnrollmentsElem) {
      const sum = courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
      totalEnrollmentsElem.textContent = sum.toLocaleString();
    }
  }

  // Add / Edit Modal Controls
  const modal = document.getElementById("course-modal");
  const openModalBtn = document.getElementById("btn-open-add-course");
  const closeModalBtn = document.getElementById("btn-close-modal");
  const cancelModalBtn = document.getElementById("btn-cancel-modal");
  const courseForm = document.getElementById("form-course-modal");

  function openModal() {
    if (modal) modal.classList.add("open");
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      if (courseForm) courseForm.reset();
      const editIdInput = document.getElementById("modal-edit-id");
      if (editIdInput) editIdInput.value = "";
      const modalTitle = document.getElementById("modal-title-text");
      if (modalTitle) modalTitle.textContent = "Add New Competency Course";
    }
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

  // Edit Course Trigger
  window.openEditCourseModal = function(id) {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    document.getElementById("modal-edit-id").value = course.id;
    document.getElementById("modal-course-title").value = course.title;
    document.getElementById("modal-course-category").value = course.category;
    document.getElementById("modal-course-instructor").value = course.instructor;
    document.getElementById("modal-course-duration").value = course.duration;
    document.getElementById("modal-course-difficulty").value = course.difficulty;
    document.getElementById("modal-course-desc").value = course.description || "";
    document.getElementById("modal-course-image").value = course.image || "";

    const modalTitle = document.getElementById("modal-title-text");
    if (modalTitle) modalTitle.textContent = "Edit Course: " + course.title;

    openModal();
  };

  // Delete Course Trigger
  window.deleteCourse = function(id) {
    if (confirm("Are you sure you want to delete this course from the portal?")) {
      courses = courses.filter(c => c.id !== id);
      localStorage.setItem("aiforce_courses", JSON.stringify(courses));
      window.showToast("Course removed from curriculum.", "success");
      renderAdminCourses();
    }
  };

  // Save Course Form Submit
  if (courseForm) {
    courseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("modal-edit-id").value;
      const title = document.getElementById("modal-course-title").value.trim();
      const category = document.getElementById("modal-course-category").value;
      const instructor = document.getElementById("modal-course-instructor").value.trim();
      const duration = document.getElementById("modal-course-duration").value.trim();
      const difficulty = document.getElementById("modal-course-difficulty").value;
      const description = document.getElementById("modal-course-desc").value.trim();
      const image = document.getElementById("modal-course-image").value.trim() || 
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

      if (editId) {
        // Update existing
        courses = courses.map(c => {
          if (c.id === editId) {
            return { ...c, title, category, instructor, duration, difficulty, description, image };
          }
          return c;
        });
        window.showToast("Course updated successfully!", "success");
      } else {
        // Create new
        const newCourse = {
          id: "c_" + Date.now(),
          title,
          category,
          instructor,
          instructorRole: "Faculty Specialist",
          duration,
          difficulty,
          rating: 5.0,
          enrolledCount: 1,
          progress: 0,
          isEnrolled: false,
          image,
          description,
          modules: [
            { title: "Module 1: Orientation & Competency Baseline", lessons: 4, duration: "2h 00m" },
            { title: "Module 2: Practical Lab & Capstone Project", lessons: 5, duration: "3h 30m" }
          ]
        };
        courses.unshift(newCourse);
        window.showToast("New course published to catalog!", "success");
      }

      localStorage.setItem("aiforce_courses", JSON.stringify(courses));
      renderAdminCourses();
      closeModal();
    });
  }

  // Export Report Simulation
  const exportReportBtn = document.getElementById("btn-export-report");
  if (exportReportBtn) {
    exportReportBtn.addEventListener("click", () => {
      window.showToast("Generating Capacity Building Audit Report...", "info");
      setTimeout(() => {
        // Create downloadable CSV
        let csvContent = "data:text/csv;charset=utf-8,Course Title,Category,Instructor,Difficulty,Enrolled Students\n";
        courses.forEach(c => {
          csvContent += `"${c.title}","${c.category}","${c.instructor}","${c.difficulty}",${c.enrolledCount}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "AI_FORCE_Capacity_Connect_Report.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.showToast("Report exported successfully!", "success");
      }, 700);
    });
  }

  renderAdminCourses();
});
