/* =========================================
   DJECTORY — home-motion.js
   Place at: assets/js/home-motion.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  document.documentElement.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------
     Typing line in the hero
  ---------------------------- */
  const roles = [
    "Linux", "VMware", "Storage & SAN", "Veeam & Zerto",
    "Oracle DB", "Oracle EBS", "OCI", "Automation"
  ];
  const typed = document.getElementById("roles");

  if (typed) {
    if (reduceMotion) {
      typed.textContent = "Linux · VMware · Oracle · OCI";
    } else {
      let wordIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const word = roles[wordIndex];
        charIndex += deleting ? -1 : 1;
        typed.textContent = word.slice(0, charIndex);

        let delay = deleting ? 40 : 90;

        if (!deleting && charIndex === word.length) {
          delay = 1400;               // pause on the full word
          deleting = true;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % roles.length;
          delay = 300;
        }

        setTimeout(tick, delay);
      };

      tick();
    }
  }

  /* ----------------------------
     Hero spotlight follows the cursor
  ---------------------------- */
  const hero = document.querySelector(".hero");

  if (hero && !reduceMotion) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      hero.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  }

  /* ----------------------------
     Reveal on scroll
     - section titles draw their underline
     - process steps fade in one after another
  ---------------------------- */
  const revealTargets = document.querySelectorAll(".section-title, .process-step");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      if (el.classList.contains("process-step")) {
        const siblings = Array.from(el.parentElement.children);
        const position = siblings.indexOf(el);
        el.style.transitionDelay = (position * 0.12) + "s";
      }

      el.classList.add("in-view");
      observer.unobserve(el);
    });
  }, { threshold: 0.2 });

  revealTargets.forEach((el) => observer.observe(el));

});
