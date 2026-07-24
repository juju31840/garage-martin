(function () {
  "use strict";

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

  var form = document.getElementById("contactForm");
  var feedback = document.getElementById("formFeedback");

  if (form && feedback) {
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
})();
