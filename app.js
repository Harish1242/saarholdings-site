(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  var page = document.body.getAttribute("data-page");
  if (links && page) {
    links.querySelectorAll("a").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("on");
    });
  }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-year-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var year = btn.getAttribute("data-year-btn");
      document.querySelectorAll("[data-year-btn]").forEach(function (b) { b.classList.toggle("on", b === btn); });
      document.querySelectorAll("[data-year]").forEach(function (el) { el.hidden = el.getAttribute("data-year") !== year; });
    });
  });
  document.querySelectorAll("[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-tab");
      document.querySelectorAll("[data-tab]").forEach(function (b) { b.classList.toggle("on", b === btn); });
      document.querySelectorAll("[data-panel]").forEach(function (el) { el.hidden = el.getAttribute("data-panel") !== id; });
    });
  });
  document.querySelectorAll("[data-mod]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-mod");
      document.querySelectorAll("[data-mod]").forEach(function (b) { b.classList.toggle("on", b === btn); });
      document.querySelectorAll("[data-module]").forEach(function (el) { el.hidden = el.getAttribute("data-module") !== id; });
    });
  });
  var form = document.getElementById("enquiry");
  if (!form) return;
  var step = 1, target = "";
  var purposes = {
    "SAAR Holdings Ltd": ["Management Services Agreement", "Strategic Acquisition Offer", "Business Services Project", "Co-Investment / Syndication", "Group treasury enquiry", "General Corporate Matter"],
    "SAAR Convenience Store Ltd": ["Franchise / Co-Location Partnership", "Site & Property Proposal", "Supplier Application", "Wrap Republic / Morning Crumbs", "Employment Enquiry"]
  };
  var error = document.getElementById("form-error");
  var label = document.getElementById("step-label");
  var next = document.getElementById("next");
  var back = document.getElementById("back");
  var purpose = document.getElementById("purpose");
  var dossier = document.getElementById("dossier");
  var count = document.getElementById("count");
  var sent = document.getElementById("sent");
  function show(n) {
    step = n;
    form.querySelectorAll("[data-step]").forEach(function (el) { el.hidden = el.getAttribute("data-step") !== String(n); });
    back.hidden = n === 1;
    label.textContent = n === 1 ? "Step 01 — Select inquiry target" : n === 2 ? "Step 02 — Identity and purpose" : "Step 03 — Proposal dossier";
    next.textContent = n === 3 ? "Send the enquiry" : "Continue";
  }
  form.querySelectorAll("[data-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      target = btn.getAttribute("data-target");
      form.querySelectorAll("[data-target]").forEach(function (b) { b.classList.toggle("on", b === btn); });
      purpose.innerHTML = '<option value="">Select purpose</option>';
      purposes[target].forEach(function (item) {
        var opt = document.createElement("option");
        opt.value = item; opt.textContent = item; purpose.appendChild(opt);
      });
      error.textContent = "";
    });
  });
  if (dossier) dossier.addEventListener("input", function () { count.textContent = String(dossier.value.trim().length); });
  back.addEventListener("click", function () { error.textContent = ""; sent.hidden = true; show(Math.max(1, step - 1)); });
  next.addEventListener("click", function () {
    error.textContent = "";
    if (step === 1) { if (!target) { error.textContent = "Select an inquiry target to proceed."; return; } show(2); return; }
    if (step === 2) {
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      if (!name || !email) { error.textContent = "Name and email are required."; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { error.textContent = "Enter a valid email address."; return; }
      if (!purpose.value) { error.textContent = "Select a purpose of inquiry."; return; }
      show(3); return;
    }
    var text = dossier.value.trim();
    if (text.length < 20) { error.textContent = "Proposal dossier must be at least 20 characters."; return; }
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var to = /treasury/i.test(purpose.value) ? "treasury@saarholdings.co.uk" : "operations@saarholdings.co.uk";
    var body = ["Inquiry target: " + target, "Full name: " + name, "Email: " + email, "Phone: " + (phone || "Not given"), "Purpose: " + purpose.value, "", "Proposal dossier:", text, "", "Sent from the SAAR Holdings website enquiry form. This is an enquiry only. It is not an offer, and no obligation arises until heads of terms are executed. This website does not store the enquiry."].join("\n");
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Enquiry — " + target + " — " + purpose.value) + "&body=" + encodeURIComponent(body);
    sent.hidden = false;
  });
})();
