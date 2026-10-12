
const root = document.documentElement;

// Footer year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Light / dark theme switcher
const themeButton = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

function setTheme(theme) {
  root.dataset.theme = theme;

  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☼" : "◐";
  }

  if (themeButton) {
    themeButton.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
    );
  }

  const themeColor = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColor) {
    themeColor.content = theme === "dark" ? "#101217" : "#f3f0e8";
  }
}

setTheme("light");

themeButton?.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  setTheme(nextTheme);
});

// Mobile navigation
const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

function closeMenu() {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open navigation");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );

  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Project category filters
const filterButtons = document.querySelectorAll(".filter-button");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;

      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projects.forEach((project) => {
      const matches =
        filter === "all" || project.dataset.category === filter;

      project.hidden = !matches;
    });
  });
});

// Subtle scroll reveal
const revealTargets = document.querySelectorAll(
  ".intro-grid, .expertise-item, .project, .approach-steps > div"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}
