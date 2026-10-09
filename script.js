(() => {
  "use strict";
  const gate = document.getElementById("gate");
  const site = document.getElementById("site");
  const form = document.getElementById("unlock-form");
  const passwordInput = document.getElementById("password");
  const error = document.getElementById("password-error");
  const lockButtons = [document.getElementById("lock-button"), document.getElementById("footer-lock-button")];

  // Decorative stars: small, static-position particles with gentle twinkle.
  const starLayer = document.getElementById("stars");
  for (let i = 0; i < 44; i++) {
    const dot = document.createElement("span");
    dot.className = "star-dot";
    const size = (Math.random() * 2.2 + 1).toFixed(1);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    dot.style.animationDuration = `${(3 + Math.random() * 4).toFixed(2)}s`;
    starLayer.appendChild(dot);
  }

  function normalizedPassword(value) {
    return value.trim().replace(/\D/g, "");
  }
  function unlock() {
    gate.hidden = true;
    site.hidden = false;
    error.hidden = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    setupReveals();
  }
  function lock() {
    site.hidden = true;
    gate.hidden = false;
    passwordInput.value = "";
    error.hidden = true;
    window.scrollTo({ top: 0, behavior: "instant" });
    passwordInput.focus({ preventScroll: true });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const attempt = normalizedPassword(passwordInput.value);
    // Accept 26 8 2025, 26 08 2025, or 26082025.
    if (["2682025", "26082025"].includes(attempt)) {
      unlock();
    } else {
      error.hidden = false;
      passwordInput.setAttribute("aria-invalid", "true");
      passwordInput.focus();
    }
  });
  passwordInput.addEventListener("input", () => {
    error.hidden = true;
    passwordInput.removeAttribute("aria-invalid");
  });
  lockButtons.forEach((button) => button.addEventListener("click", lock));

  const grid = document.getElementById("memory-grid");
  const memories = Array.isArray(window.MEMORIES) ? window.MEMORIES : [];
  memories.forEach((memory, index) => {
    const card = document.createElement("article");
    card.className = "memory-card reveal";
    const imageWrap = document.createElement("div");
    imageWrap.className = "memory-image-wrap";
    if (memory.image && memory.image.trim()) {
      const img = document.createElement("img");
      img.src = memory.image;
      img.alt = memory.alt || memory.title || "Friendship memory";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => {
        img.remove();
        imageWrap.appendChild(makePlaceholder(memory));
      }, { once: true });
      imageWrap.appendChild(img);
    } else {
      imageWrap.appendChild(makePlaceholder(memory));
    }
    const meta = document.createElement("div");
    meta.className = "memory-meta";
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = memory.title || `Memory ${index + 1}`;
    const caption = document.createElement("p");
    caption.textContent = memory.caption || "";
    copy.append(title, caption);
    const number = document.createElement("span");
    number.className = "memory-number";
    number.textContent = String(index + 1).padStart(2, "0");
    meta.append(copy, number);
    card.append(imageWrap, meta);
    grid.appendChild(card);
  });

  function makePlaceholder(memory) {
    const placeholder = document.createElement("div");
    placeholder.className = "memory-placeholder";
    const inner = document.createElement("div");
    const icon = document.createElement("span");
    icon.className = "placeholder-icon";
    icon.textContent = "✧";
    const title = document.createElement("div");
    title.className = "placeholder-title";
    title.textContent = memory.title || "A memory to keep";
    const subtitle = document.createElement("div");
    subtitle.className = "placeholder-subtitle";
    subtitle.textContent = "YOUR PHOTO GOES HERE";
    inner.append(icon, title, subtitle);
    placeholder.appendChild(inner);
    return placeholder;
  }

  let observer;
  function setupReveals() {
    const revealItems = document.querySelectorAll("#site .reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  }

  // The memories and letter remain hidden until the gate is unlocked.
  passwordInput.focus({ preventScroll: true });
})();
