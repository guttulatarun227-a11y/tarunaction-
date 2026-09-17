/**
 * AI FORCE - Authentication Engine (Login, Registration, Demo Fillers)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Password Visibility Toggles
  const togglePassBtns = document.querySelectorAll(".input-toggle-btn");
  togglePassBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        input.type = "password";
        btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  });

  // Demo Credentials Fillers
  const demoStudentBtn = document.getElementById("btn-demo-student");
  const demoAdminBtn = document.getElementById("btn-demo-admin");
  const demoFacultyBtn = document.getElementById("btn-demo-faculty");

  if (demoStudentBtn) {
    demoStudentBtn.addEventListener("click", () => {
      const emailInput = document.getElementById("login-email");
      const passInput = document.getElementById("login-password");
      if (emailInput && passInput) {
        emailInput.value = "student@aiforce.edu";
        passInput.value = "Student@123";
        window.showToast("Student credentials filled! Click Login.", "info");
      }
    });
  }

  if (demoAdminBtn) {
    demoAdminBtn.addEventListener("click", () => {
      const emailInput = document.getElementById("login-email");
      const passInput = document.getElementById("login-password");
      if (emailInput && passInput) {
        emailInput.value = "admin@aiforce.edu";
        passInput.value = "Admin@123";
        window.showToast("Admin credentials filled! Click Login.", "info");
      }
    });
  }

  if (demoFacultyBtn) {
    demoFacultyBtn.addEventListener("click", () => {
      const emailInput = document.getElementById("login-email");
      const passInput = document.getElementById("login-password");
      if (emailInput && passInput) {
        emailInput.value = "faculty@aiforce.edu";
        passInput.value = "Faculty@123";
        window.showToast("Faculty credentials filled! Click Login.", "info");
      }
    });
  }

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(`/api${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed.");
    return data;
  };

  // Handle Login Form Submit
  const loginForm = document.getElementById("form-login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;

      if (!email || !password) {
        window.showToast("Please enter both email and password.", "error");
        return;
      }

      try {
        const { token, user } = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
        localStorage.setItem("aiforce_token", token);
        localStorage.setItem("aiforce_user", JSON.stringify(user));
        window.showToast(`Welcome back, ${user.fullName}!`, "success");
        setTimeout(() => {
          window.location.href = user.role === "Admin" ? "admin.html" : "dashboard.html";
        }, 700);
      } catch (error) {
        window.showToast(error.message, "error");
      }
    });
  }

  // Handle Registration Form Submit
  const registerForm = document.getElementById("form-register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const mobile = document.getElementById("reg-mobile").value.trim();
      const studentId = document.getElementById("reg-id").value.trim();
      const department = document.getElementById("reg-department").value;
      const role = document.getElementById("reg-role") ? document.getElementById("reg-role").value : "Student";
      const password = document.getElementById("reg-password").value;
      const confirmPassword = document.getElementById("reg-confirm-password").value;

      if (!fullName || !email || !studentId || !password) {
        window.showToast("Please fill in all required fields.", "error");
        return;
      }

      if (password !== confirmPassword) {
        window.showToast("Passwords do not match! Please check.", "error");
        return;
      }

      if (password.length < 6) {
        window.showToast("Password must be at least 6 characters.", "error");
        return;
      }

      try {
        const { token, user } = await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ fullName, email, mobile, studentId, department, role, password })
        });
        if (!token) {
          window.showToast("Account created. Check your email to confirm your account.", "info");
          return;
        }
        localStorage.setItem("aiforce_token", token);
        localStorage.setItem("aiforce_user", JSON.stringify(user));
        window.showToast("Account successfully registered!", "success");
        setTimeout(() => {
          window.location.href = role === "Admin" ? "admin.html" : "dashboard.html";
        }, 800);
      } catch (error) {
        window.showToast(error.message, "error");
      }
    });
  }
});

// Logout Handler
window.logoutUser = function() {
  if (confirm("Are you sure you want to log out of AI FORCE?")) {
    window.showToast("Logged out successfully.", "info");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 400);
  }
};
