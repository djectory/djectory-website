/* ==========================================
   DJECTORY
   app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------
       Particle Network Background
    ---------------------------- */

    const canvas = document.getElementById("particle-canvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");
        let particles = [];
        let mouse = { x: null, y: null };

        const COLORS = ["#2ef2ff", "#ff2ee0", "#ffb92e"];
        const PARTICLE_COUNT_DIVISOR = 14000; // lower = more particles
        const LINK_DISTANCE = 130;
        const MOUSE_RADIUS = 150;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            const count = Math.floor((canvas.width * canvas.height) / PARTICLE_COUNT_DIVISOR);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.6 + 0.8,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)]
                });
            }
        }

        function step() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // move + draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // gentle drift away from cursor
                if (mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS) {
                        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                        p.x += (dx / dist) * force * 1.2;
                        p.y += (dy / dist) * force * 1.2;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.85;
                ctx.fill();
            }

            // links between nearby particles
            ctx.globalAlpha = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < LINK_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = "rgba(46,242,255," + (1 - dist / LINK_DISTANCE) * 0.25 + ")";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(step);
        }

        window.addEventListener("resize", () => {
            resizeCanvas();
            createParticles();
        });

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener("mouseout", () => {
            mouse.x = null;
            mouse.y = null;
        });

        resizeCanvas();
        createParticles();

        // Respect users who prefer reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            requestAnimationFrame(step);
        }
    }

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