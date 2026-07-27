(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var prevBtn = carousel.querySelector("[data-carousel-prev]");
    var nextBtn = carousel.querySelector("[data-carousel-next]");
    var dotsWrap = carousel.querySelector("[data-carousel-dots]");
    if (!track) return;

    function items() {
      return track.querySelectorAll(".carousel-card, .press-card");
    }

    function itemWidth() {
      var item = items()[0];
      return item ? item.getBoundingClientRect().width + 20 : track.clientWidth;
    }

    function pageCount() {
      var perPage = Math.max(1, Math.round(track.clientWidth / itemWidth()));
      return Math.max(1, Math.ceil(items().length / perPage));
    }

    function currentPage() {
      var pages = pageCount();
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return 0;
      return Math.round((track.scrollLeft / maxScroll) * (pages - 1));
    }

    function updateDots() {
      if (!dotsWrap) return;
      var active = currentPage();
      dotsWrap.querySelectorAll(".carousel-dot").forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === active);
      });
    }

    function buildDots() {
      if (!dotsWrap) return;
      var pages = pageCount();
      dotsWrap.innerHTML = "";
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Page " + (i + 1));
        (function (index) {
          dot.addEventListener("click", function () {
            var maxScroll = track.scrollWidth - track.clientWidth;
            var target = pages > 1 ? (maxScroll * index) / (pages - 1) : 0;
            track.scrollTo({ left: target, behavior: "smooth" });
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function scrollByPage(direction) {
      track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { scrollByPage(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { scrollByPage(1); });

    var scrollTicking = false;
    track.addEventListener(
      "scroll",
      function () {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(function () {
          updateDots();
          scrollTicking = false;
        });
      },
      { passive: true }
    );

    buildDots();
    window.addEventListener("resize", buildDots);
  });

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

  var galleryContainer = document.querySelector("[data-gallery]");
  var lightbox = document.getElementById("lightbox");
  if (galleryContainer && lightbox) {
    var galleryItems = Array.prototype.slice.call(galleryContainer.querySelectorAll(".gallery-item"));
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");
    var lightboxIndex = 0;

    function showLightboxIndex(index) {
      lightboxIndex = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[lightboxIndex];
      var img = item.querySelector("img");
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = item.getAttribute("data-caption") || img.alt;
    }

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        showLightboxIndex(index);
        lightbox.showModal();
      });
    });

    var lightboxPrev = lightbox.querySelector("[data-lightbox-prev]");
    var lightboxNext = lightbox.querySelector("[data-lightbox-next]");
    var lightboxClose = lightbox.querySelector("[data-lightbox-close]");

    if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showLightboxIndex(lightboxIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener("click", function () { showLightboxIndex(lightboxIndex + 1); });
    if (lightboxClose) lightboxClose.addEventListener("click", function () { lightbox.close(); });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") showLightboxIndex(lightboxIndex - 1);
      if (event.key === "ArrowRight") showLightboxIndex(lightboxIndex + 1);
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
