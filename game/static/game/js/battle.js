// static/game/js/battle.js

document.addEventListener("DOMContentLoaded", () => {
  const logSection = document.querySelector(".log-section");
  if (logSection) {
    logSection.scrollTop = logSection.scrollHeight;
  }

  const form = document.querySelector('.command-box form');
  if (form) {
    form.addEventListener("submit", () => {
      const buttons = form.querySelectorAll("button");
      buttons.forEach(btn => btn.disabled = true);
    });
  }
});
