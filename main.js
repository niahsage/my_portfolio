document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     Update footer year
  ------------------------------ */
  const yrEl = document.getElementById("yr");
  if (yrEl) yrEl.textContent = new Date().getFullYear();


  /* ------------------------------
     Dark mode toggle
  ------------------------------ */
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


  /* ------------------------------
     Smooth scroll with header offset
  ------------------------------ */
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


  /* ------------------------------
     Lightbox (open)
  ------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");

  if (lightbox && lbImg) {
    document.querySelectorAll(".tile").forEach(tile => {
      tile.addEventListener("click", (e) => {
        // Do NOT open lightbox if clicking the Astrolove "View site" link
        if (e.target.closest(".cap-link")) return;

        const fullSrc = tile.getAttribute("data-full");
        if (!fullSrc) return;
        lbImg.src = fullSrc;
        lightbox.showModal();
      });
    });

    // Close if clicking outside modal content
    lightbox.addEventListener("click", (e) => {
      const rect = lightbox.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) lightbox.close();
    });
  }


  /* ------------------------------
     Lightbox (close button fix)
     Prevent page from jumping to top
  ------------------------------ */
  const lbForm = document.querySelector("#lightbox form");
  if (lbForm && lightbox) {
    lbForm.addEventListener("submit", (e) => {
      e.preventDefault();     // prevent jump
      lightbox.close();       // clean close
    });
  }


  /* ------------------------------
     Contact Form — Formspree AJAX
     No redirect, inline success message
  ------------------------------ */
  const contactForm = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (contactForm && status) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop Formspree redirect

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
            "Something went wrong. Please try again or email me directly.";
        }
      } catch (err) {
        status.textContent =
          "Network error. Please try again or email me directly.";
      }
    });
  }

});
