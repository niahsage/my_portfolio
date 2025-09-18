/*
  main.js
  Handles page interactions including:
  - Toggling dark mode 
  - Displaying animated feedback after the contact form is submitted
*/

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const toggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");

      if (!name.value.trim() || !email.value.trim()) {
        alert("Please fill out your name and email.");
        return;
      }

      const msg = document.createElement("div");
      msg.className = "sent-message";
      msg.textContent = "💌 Message sent! I’ll get back to you soon.";
      form.appendChild(msg);

      setTimeout(() => {
        msg.remove();
        form.reset();
      }, 4000);
    });
  }
});
