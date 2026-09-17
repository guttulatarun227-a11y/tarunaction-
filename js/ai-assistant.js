/**
 * AI FORCE - AI Assistant Engine (ChatGPT Style)
 * Provides intelligent doubt resolution, suggested prompts, simulated typing,
 * and auto-scrolling with an extensible backend API hook.
 */

document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("ai-chat-messages");
  const chatInput = document.getElementById("ai-user-input");
  const sendBtn = document.getElementById("btn-send-message");
  const clearBtn = document.getElementById("btn-clear-chat");
  const chipButtons = document.querySelectorAll(".chip-btn");

  if (!messagesContainer || !chatInput) return;

  // Auto-scroll to bottom of chat
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Append a message bubble to the chat
  function appendMessage(sender, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;

    const avatarHtml = sender === "bot" 
      ? `<div class="bubble-avatar bot"><i class="fa-solid fa-robot"></i></div>`
      : `<div class="bubble-avatar user"><i class="fa-solid fa-user"></i></div>`;

    bubble.innerHTML = `
      ${avatarHtml}
      <div class="bubble-text-content">${text}</div>
    `;

    messagesContainer.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  // Display simulated typing indicator
  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator-box";
    indicator.className = "chat-bubble bot";
    indicator.innerHTML = `
      <div class="bubble-avatar bot"><i class="fa-solid fa-robot"></i></div>
      <div class="bubble-text-content">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator-box");
    if (indicator) indicator.remove();
  }

  // Core askAI function specified in requirements
  // Designed with fallback to demo logic, easily swapped to fetch('/api/ask-ai')
  window.askAI = async function(question) {
    // 1. Optional Real Backend Hook (Extensible architecture)
    try {
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) return data.reply;
      }
    } catch (e) {
      // Backend route not reachable in pure static demo mode, fallback to local AI brain
    }

    // 2. Intelligent Demo AI Response Engine for SIH / Capacity Connect
    const q = question.toLowerCase();

    if (q.includes("machine learning") || q.includes("ml vs dl") || q.includes("deep learning")) {
      return `<strong>Machine Learning vs. Deep Learning:</strong><br><br>
      • <strong>Machine Learning (ML):</strong> A subfield of AI where algorithms learn patterns from structured features (e.g., linear regression, random forests). Requires manual feature engineering.<br>
      • <strong>Deep Learning (DL):</strong> A subset of ML utilizing multi-layered artificial neural networks (ANNs, CNNs, Transformers) capable of automatic representation learning directly from raw data like images, audio, and text.<br><br>
      <em>Recommended Next Step: Check out Module 1 in 'Applied Machine Learning & Deep Neural Networks'.</em>`;
    }

    if (q.includes("capacity connect") || q.includes("ai force") || q.includes("problem statement")) {
      return `<strong>CAPACITY CONNECT Vision & Architecture:</strong><br><br>
      AI FORCE is designed specifically to address the mandate: <em>"A Digital Capacity Building and Learning Management Portal to support organizational training, competency development, and knowledge sharing through a centralized web-based platform."</em><br><br>
      Key pillars include:<br>
      1. <strong>Targeted Competency Frameworks:</strong> Aligning courses to industry roles.<br>
      2. <strong>AI Doubt Resolution:</strong> 24/7 personalized pedagogical assistance.<br>
      3. <strong>Synchronous Knowledge Sharing:</strong> Integrated Live Virtual Classrooms.<br>
      4. <strong>Automated Verification:</strong> Instant digital certificates with tamper-proof IDs.`;
    }

    if (q.includes("gradient descent") || q.includes("optimization")) {
      return `<strong>Gradient Descent Explained:</strong><br><br>
      Gradient descent is an iterative optimization algorithm used to minimize the loss function $L(\\theta)$ in machine learning models.<br><br>
      1. <strong>Compute Gradient:</strong> Calculate the partial derivative of the loss with respect to model weights: $\\nabla L(\\theta)$.<br>
      2. <strong>Update Weights:</strong> Move in the opposite direction of the gradient by a step size governed by the learning rate ($\\alpha$):<br>
      <code>θ_new = θ_old - α * ∇L(θ)</code><br>
      3. <strong>Variants:</strong> Batch Gradient Descent (entire dataset), Stochastic (1 sample), and Mini-batch (32-256 samples, industry standard).`;
    }

    if (q.includes("cloud") || q.includes("kubernetes") || q.includes("docker")) {
      return `<strong>Cloud-Native & Kubernetes Microservices:</strong><br><br>
      • <strong>Containers (Docker):</strong> Package applications with dependencies for repeatable runtime execution across any cloud environment.<br>
      • <strong>Kubernetes (K8s):</strong> The industry-standard container orchestration engine providing automated deployment, scaling, self-healing, and service discovery.<br>
      • <strong>Pod:</strong> The smallest deployable computing unit in Kubernetes containing one or more tightly coupled containers.<br><br>
      <em>Check out our course: 'Cloud Native Microservices with Kubernetes'!</em>`;
    }

    if (q.includes("cyber") || q.includes("zero trust") || q.includes("security")) {
      return `<strong>Zero-Trust Security Architecture:</strong><br><br>
      Zero Trust operates on the core maxim: <em>"Never Trust, Always Verify."</em><br><br>
      Core Principles:<br>
      1. <strong>Explicit Verification:</strong> Authenticate and authorize based on all available data points (user identity, location, device health).<br>
      2. <strong>Least-Privilege Access:</strong> Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).<br>
      3. <strong>Assume Breach:</strong> Segment network perimeters, encrypt end-to-end, and utilize continuous telemetry.`;
    }

    if (q.includes("quiz") || q.includes("test") || q.includes("assessment")) {
      return `I can help test your knowledge! Navigate to the <strong>Assessments</strong> tab from the sidebar to take the official <em>Artificial Intelligence & Machine Learning Competency Benchmark</em>. It includes immediate scoring, percentage metrics, and certificate eligibility upon passing (70%+).`;
    }

    // Default synthesized learning response
    return `Thank you for your question on <em>"${question}"</em>.<br><br>
    In modern AI-powered capacity building, continuous skill verification and concept reinforcement are critical. Here are three key takeaways regarding this topic:<br><br>
    1. <strong>Fundamental Core:</strong> Break down the problem into atomic modular components before applying complex algorithmic solutions.<br>
    2. <strong>Enterprise Practice:</strong> Focus on scalability, security compliance, and peer-to-peer knowledge sharing.<br>
    3. <strong>Suggested Resource:</strong> Review the interactive modules in our Course Catalog or test your retention in the Assessments module.<br><br>
    Feel free to ask for a deeper dive or specific code examples!`;
  };

  // Handle Send Message
  async function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user query
    appendMessage("user", text);
    chatInput.value = "";
    chatInput.focus();

    // Show AI typing indicator
    showTypingIndicator();

    // Simulated network/model latency (500ms - 900ms)
    setTimeout(async () => {
      removeTypingIndicator();
      const aiReply = await window.askAI(text);
      appendMessage("bot", aiReply);
    }, 750);
  }

  // Event Listeners
  sendBtn.addEventListener("click", handleSendMessage);

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Suggested Prompt Chips
  chipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const promptText = btn.getAttribute("data-prompt") || btn.textContent.trim();
      chatInput.value = promptText;
      handleSendMessage();
    });
  });

  // Clear Chat Button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear current conversation history?")) {
        messagesContainer.innerHTML = `
          <div class="chat-bubble bot">
            <div class="bubble-avatar bot"><i class="fa-solid fa-robot"></i></div>
            <div class="bubble-text-content">
              Hello! I am your <strong>AI FORCE Tutor</strong>. I am here to help answer questions about your courses, resolve technical doubts, and guide your capacity development. How can I assist you today?
            </div>
          </div>
        `;
        window.showToast("Conversation cleared.", "info");
      }
    });
  }
});
