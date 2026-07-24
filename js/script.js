(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }

  function setupContactForm(form) {
    var feedback = form.querySelector(".form-feedback");
    if (!feedback) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();

      if (!name || !phone || !message) {
        feedback.textContent = "Merci de remplir tous les champs.";
        feedback.className = "form-feedback error";
        return;
      }

      feedback.textContent = "Merci " + name + ", votre message a bien été envoyé. Nous vous recontactons rapidement.";
      feedback.className = "form-feedback success";
      form.reset();
    });
  }

  document.querySelectorAll(".contact-form").forEach(setupContactForm);

  var rdvModal = document.getElementById("rdvModal");
  if (rdvModal) {
    document.querySelectorAll("[data-open-rdv]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        rdvModal.showModal();
      });
    });

    rdvModal.querySelectorAll("[data-close-rdv]").forEach(function (closer) {
      closer.addEventListener("click", function () {
        rdvModal.close();
      });
    });

    rdvModal.addEventListener("click", function (event) {
      if (event.target === rdvModal) {
        rdvModal.close();
      }
    });

    rdvModal.addEventListener("close", function () {
      var feedback = rdvModal.querySelector(".form-feedback");
      if (feedback) {
        feedback.textContent = "";
        feedback.className = "form-feedback";
      }
    });
  }

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (canHover && !prefersReducedMotion) {
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("mousemove", function (event) {
        var rect = el.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        var rotateX = (-y * 8).toFixed(2);
        var rotateY = (x * 8).toFixed(2);
        el.style.transform =
          "perspective(700px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  var heroImage = document.querySelector(".hero-media img");
  if (heroImage && !prefersReducedMotion) {
    var ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY * 0.15, 80);
          heroImage.style.transform = "translateY(" + offset.toFixed(1) + "px) scale(1.08)";
          ticking = false;
        });
      },
      { passive: true }
    );
  }
})();
