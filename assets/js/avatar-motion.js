/* =========================================
   DJECTORY — avatar-motion.js
   Place at: assets/js/avatar-motion.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const frame = document.querySelector(".avatar-frame");
  if (!frame) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  // Touch screens and reduced-motion users get the static photo
  if (reduceMotion || !canHover) return;

  frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    frame.style.setProperty("--rx", (-y * 20).toFixed(2) + "deg");
    frame.style.setProperty("--ry", (x * 20).toFixed(2) + "deg");
  });

  frame.addEventListener("mouseleave", () => {
    frame.style.setProperty("--rx", "0deg");
    frame.style.setProperty("--ry", "0deg");
  });

});
