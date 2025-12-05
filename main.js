document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     Footer year
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
     Smooth scroll (header offset)
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
     Lightbox overlay (no dialog)
  ------------------------------ */
  const overlay = document.getElementById("lightboxOverlay");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");

  if (overlay && lbImg) {
    // open on tile click
    document.querySelectorAll(".tile").forEach(tile => {
      tile.addEventListener("click", (e) => {
        // Don’t open when clicking Astrolove 'View site'
        if (e.target.closest(".cap-link")) return;

        const fullSrc = tile.getAttribute("data-full");
        if (!fullSrc) return;

        lbImg.src = fullSrc;
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";  // lock background scroll
      });
    });

    // close when clicking outside image area
    overlay.addEventListener("click", (e) => {
      const inner = e.target.closest(".lb-inner");
      if (!inner) {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  if (lbClose && overlay) {
    lbClose.addEventListener("click", (e) => {
      e.stopPropagation();
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    });
  }


  /* ------------------------------
     Contact form — Formspree AJAX
  ------------------------------ */
  const contactForm = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (contactForm && status) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop redirect to Formspree "thanks" page

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
