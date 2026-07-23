/* ==========================================
   DJECTORY
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------
       Sticky Navbar Shadow
    ---------------------------- */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow = "0 10px 35px rgba(0,255,255,.15)";

        } else {

            header.style.boxShadow = "none";

        }

    });

    /* ----------------------------
       Fade In Animation
    ---------------------------- */

    const elements = document.querySelectorAll(
        ".about-card, .skill-card, .blog-card, .stat-box, .contact-card"
    );

    elements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all .7s ease";

    });

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .15

    });

    elements.forEach(el => observer.observe(el));

    /* ----------------------------
       Active Navigation
    ---------------------------- */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ----------------------------
       Terminal Typing Effect
    ---------------------------- */

    const online = document.querySelector(".online");

    if (online) {

        setInterval(() => {

            online.style.opacity = "0.2";

            setTimeout(() => {

                online.style.opacity = "1";

            }, 500);

        }, 1000);

    }

    /* ----------------------------
       Tech Stack Hover Animation
    ---------------------------- */

    document.querySelectorAll(".tech-stack span").forEach((tag) => {

        tag.addEventListener("mouseenter", () => {

            tag.style.transform = "translateY(-6px) scale(1.08)";

        });

        tag.addEventListener("mouseleave", () => {

            tag.style.transform = "translateY(0) scale(1)";

        });

    });

    /* ----------------------------
       Smooth Card Hover Glow
    ---------------------------- */

    document.querySelectorAll(
        ".about-card,.skill-card,.blog-card,.stat-box,.contact-card"
    ).forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(circle at ${x}px ${y}px,
                rgba(0,255,255,.15),
                #101826 45%)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#101826";

        });

    });

});