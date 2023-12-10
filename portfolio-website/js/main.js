// Function to toggle the theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");

  const themeToggle = document.getElementById("theme-toggle");

  // Update the theme toggle text
  if (body.classList.contains("light-theme")) {
    themeToggle.textContent = "Switch-Theme";
  } else {
    themeToggle.textContent = "Switch-Theme";
  }

  // Save the selected theme in localStorage
  const selectedTheme = body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", selectedTheme);

  // Update the navbar theme as well
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("light-theme");
  navbar.classList.toggle("dark-theme");
}

// Check for previously selected theme on page load
document.addEventListener("DOMContentLoaded", function() {
  const theme = localStorage.getItem("theme");
  const themeToggle = document.getElementById("theme-toggle");

  // Apply the saved theme
  if (theme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "Switch-Theme";
  } else if (theme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.textContent = "Switch-Theme";
  } else {
    // No saved theme, apply default
    document.body.classList.add("light-theme");
  }

  // Apply the saved theme to the navbar
  const navbar = document.querySelector(".navbar");
  navbar.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
});
