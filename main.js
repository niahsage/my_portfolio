document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yrEl = document.getElementById("yr");
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // Dark mode toggle
  const modeBtn = document.getElementById("modeBtn");
  let dark = false;
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      dark = !dark;
      document.documentElement.style.setProperty("--bg", dark ? "#0b0e14" : "#fff8f5");
      document.documentElement.style.setProperty("--card", dark ? "#111827" : "#ffffff");
      document.documentElement.style.setProperty("--ink", dark ? "#e5e7eb" : "#1f2937");
      document.documentElement.style.setProperty("--muted", dark ? "#9ca3af" : "#6b7280");
      modeBtn.textContent = dark ? "☀️" : "🌙";
    });
  }

  // Smooth scroll offset for sticky header
  const header = document.querySelector("header");
  const headerH = () => (header ? header.getBoundingClientRect().height : 0);

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - headerH() - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // Lightbox system
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");

  if (lightbox && lbImg) {
    document.querySelectorAll(".tile").forEach(tile => {
      tile.addEventListener("click", (e) => {
        // Don't open lightbox when clicking "View site" on Astrolove
        if (e.target.closest(".cap-link")) return;

        const fullSrc = tile.getAttribute("data-full");
        if (!fullSrc) return;
        lbImg.src = fullSrc;
        lightbox.showModal();
      });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      const r = lightbox.getBoundingClientRect();
      const within =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!within) lightbox.close();
    });
  }

  // Contact form with Formspree (AJAX submit + inline status)
  const contactForm = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (contactForm && status) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // 🚫 stop normal redirect to Formspree page

      status.textContent = "Sending…";

      const data = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          status.textContent = "Thank you! Your message was sent 💛";
          contactForm.reset();
        } else {
          status.textContent =
            "Hmm, something went wrong. Please try again or email me directly.";
        }
      } catch (err) {
        status.textContent =
          "Network error. Please try again or email me directly.";
      }
    });
  }
});
