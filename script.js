// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
  menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("active"));
});

// Close mobile menu when clicking nav items
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const updateThemeIcon = () => {
  themeToggle.textContent =
    document.body.dataset.theme === "dark" ? "🌞" : "🌙";
};

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  updateThemeIcon();
});

// Initialize
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.dataset.theme = savedTheme;
updateThemeIcon();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, null, this.getAttribute("href"));
    }
  });
});

// Close menu on scroll
window.addEventListener("scroll", () => {
  if (navLinks.classList.contains("active")) {
    menuBtn.classList.remove("active");
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Dynamic text effect
const dynamicTextElement = document.getElementById("dynamic-text");
const textOptions = [
  "Computer Science Student",
  "Full Stack Developer",
  "Web Developer",
  "AI Enthusiast",
];

let textIndex = 0;
function updateDynamicText() {
  dynamicTextElement.textContent = textOptions[textIndex];
  dynamicTextElement.style.opacity = "1"; // Fade in

  setTimeout(() => {
    dynamicTextElement.style.opacity = "0"; // Fade out
    textIndex = (textIndex + 1) % textOptions.length;
    setTimeout(updateDynamicText, 500); // Change after fade out
  }, 2000); // Stay visible for 2 seconds
}

updateDynamicText();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      }
    }
  });
});
document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');

    // Show loading state
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        alert("Message sent successfully!");
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (error) {
      alert("Error: Please email me directly at praveenkumar97213@gmail.com");
    } finally {
      btn.disabled = false;
      btn.innerHTML = "Send Message";
    }
  });
// Light mode adjustments for download buttons
function updateDownloadButtonColors() {
  const downloadButtons = document.querySelectorAll(".btn-download");
  downloadButtons.forEach((btn) => {
    if (document.body.dataset.theme === "light") {
      btn.style.color = "#333";
    } else {
      btn.style.color = "";
    }
  });
}

// Initialize and watch for theme changes
updateDownloadButtonColors();
