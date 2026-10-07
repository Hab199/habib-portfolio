/* =====================================================================
   Habib Abdu Ali — Portfolio
   All behaviour: mobile menu, scroll spy, reveal, terminal, form.
   No dependencies.
   ===================================================================== */

(function () {
  "use strict";

  /* Set to false once you connect a real form service (see index.html). */
  const USE_MAILTO = true;
  const CONTACT_EMAIL = "habibabdu342@gmail.com";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------
     1. Mobile menu
     ------------------------------------------------------------------ */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  function setMenu(open) {
    mobileMenu.classList.toggle("hidden", !open);
    iconOpen.classList.toggle("hidden", open);
    iconClose.classList.toggle("hidden", !open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      setMenu(mobileMenu.classList.contains("hidden"));
    });

    // Close after choosing a section
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    // Reset when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     2. Header background on scroll + back-to-top button
     ------------------------------------------------------------------ */
  const header = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const scrolled = window.scrollY > 20;
    if (header) header.classList.toggle("is-scrolled", scrolled);
    if (backToTop) backToTop.classList.toggle("hidden", window.scrollY < 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     3. Scroll spy — highlight the active nav link
     ------------------------------------------------------------------ */
  const sections = Array.from(
    document.querySelectorAll("main section[id]")
  );
  const navLinks = Array.from(document.querySelectorAll(".nav-link, .mobile-nav-link"));

  function setActive(id) {
    navLinks.forEach(function (link) {
      const match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", match);
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ------------------------------------------------------------------
     4. Reveal on scroll
     ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     5. Hero terminal typing effect
     ------------------------------------------------------------------ */
  const typedEl = document.getElementById("typed-command");
  const outputEl = document.getElementById("terminal-output");

  const COMMAND = "whoami";
  const OUTPUT = "Habib Abdu Ali — Software Engineering Student";

  function runTerminal() {
    if (!typedEl || !outputEl) return;

    if (prefersReducedMotion) {
      typedEl.textContent = COMMAND;
      outputEl.textContent = OUTPUT;
      return;
    }

    let i = 0;
    const typeTimer = setInterval(function () {
      typedEl.textContent = COMMAND.slice(0, ++i);
      if (i >= COMMAND.length) {
        clearInterval(typeTimer);
        setTimeout(function () {
          let j = 0;
          const outTimer = setInterval(function () {
            outputEl.textContent = OUTPUT.slice(0, ++j);
            if (j >= OUTPUT.length) clearInterval(outTimer);
          }, 38);
        }, 420);
      }
    }, 110);
  }

  runTerminal();

  /* ------------------------------------------------------------------
     6. Contact form (mailto — no backend)
     ------------------------------------------------------------------ */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function showStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("hidden", "text-emerald-400", "text-red-400");
    status.classList.add(ok ? "text-emerald-400" : "text-red-400");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // Basic validation
      const fields = [
        { el: form.name, ok: name.length > 0 },
        { el: form.email, ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
        { el: form.message, ok: message.length > 0 },
      ];

      let valid = true;
      fields.forEach(function (f) {
        f.el.classList.toggle("is-invalid", !f.ok);
        if (!f.ok) valid = false;
      });

      if (!valid) {
        showStatus("Please fill in all fields with a valid email.", false);
        return;
      }

      if (USE_MAILTO) {
        const subject = encodeURIComponent("Portfolio contact from " + name);
        const body = encodeURIComponent(
          message + "\n\n— " + name + " (" + email + ")"
        );
        window.location.href =
          "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        showStatus("Opening your email app…", true);
      } else {
        /* Future: POST the form data to your form service here. */
        showStatus("Message sent. Thank you!", true);
      }

      form.reset();
    });

    // Clear invalid state while typing
    form.querySelectorAll(".form-input").forEach(function (input) {
      input.addEventListener("input", function () {
        input.classList.remove("is-invalid");
      });
    });
  }

  /* ------------------------------------------------------------------
     7. Toast notifications
     ------------------------------------------------------------------ */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.add("hidden");
    }, 3200);
  }

  /* ------------------------------------------------------------------
     8. CV file check
     If assets/Habib-Abdu-Ali-CV.pdf hasn't been added yet, the
     Download CV buttons show a friendly message instead of a 404.
     ------------------------------------------------------------------ */
  const cvPath = "assets/Habib-Abdu-Ali-CV.pdf";
  let cvReady = true;

  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    fetch(cvPath, { method: "HEAD" })
      .then(function (res) {
        cvReady = res.ok;
      })
      .catch(function () {
        cvReady = false;
      });
  }

  document.querySelectorAll('a[download][href$="Habib-Abdu-Ali-CV.pdf"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (!cvReady) {
        e.preventDefault();
        showToast("My CV will be uploaded here soon — please check back or email me.");
      }
    });
  });

  /* ------------------------------------------------------------------
     9. Footer year
     ------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
