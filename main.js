// Footer year
document.getElementById("yr").textContent = new Date().getFullYear();

// Dark mode toggle
const modeBtn = document.getElementById("modeBtn");
let dark = false;
modeBtn.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.style.setProperty("--bg", dark ? "#0b0e14" : "#fff8f5");
  document.documentElement.style.setProperty("--card", dark ? "#111827" : "#ffffff");
  document.documentElement.style.setProperty("--ink", dark ? "#e5e7eb" : "#1f2937");
  document.documentElement.style.setProperty("--muted", dark ? "#9ca3af" : "#6b7280");
  modeBtn.textContent = dark ? "☀️" : "🌙";
});

// Smooth scroll offset for sticky header
const header = document.querySelector("header");
const headerH = () => header.getBoundingClientRect().height;

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    e.preventDefault();
    const el = document.querySelector(id);
    const top = el.getBoundingClientRect().top + window.scrollY - headerH() - 12;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Lightbox system
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");

document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", (e) => {

    // 🚫 If clicking the Astrolove "View site" link, do NOT open the lightbox
    if (e.target.closest(".cap-link")) return;

    lbImg.src = tile.getAttribute("data-full");
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
