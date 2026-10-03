(function () {
  var links = document.getElementById("links");
  var menu = document.getElementById("menu");
  if (menu && links) {
    menu.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menu.classList.toggle("open", open);
      menu.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("lock", open);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        menu.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        document.body.classList.remove("lock");
      });
    });
  }
  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!file) file = "index.html";
  document.querySelectorAll(".links a[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav") + ".html" === file) a.classList.add("on");
  });

  var nodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (el) { io.observe(el); });
  } else {
    nodes.forEach(function (el) { el.classList.add("in"); });
  }

  var box = document.getElementById("metrics");
  if (!box) return;
  var sets = {
    2026: [
      ["32", "Businesses evaluated", "Entities vetted", "Since incorporation in February 2026, the board has screened and scored 32 UK high-street businesses across convenience retail, food service and commercial property."],
      ["1", "Active subsidiary", "Trading operations", "SAAR Convenience Store Limited, SC890711, is the active trading subsidiary. Location work is underway across Glasgow, Dunblane and central Scotland."],
      ["3", "Running projects", "Concept / staging", "Three routes are live: operational management, strategic acquisitions, and business services including SAAR-INT."],
      ["4", "Total employees", "Expert talent", "The operating group is a small desk. Directors, technology, and the subsidiary floor."],
      ["36", "Allied partners", "Professional allies", "Counsel, accountants and operators across Glasgow, Edinburgh and the wider UK file."]
    ],
    2027: [
      ["\u2014", "Businesses evaluated", "Target", "2027 targets are not published. The 2026 board remains the live figure."],
      ["\u2014", "Active subsidiary", "Target", "Subsidiary count is not forecast on the public site."],
      ["\u2014", "Running projects", "Target", "Project count follows the file, not a published target."],
      ["\u2014", "Total employees", "Target", "Headcount is not forecast on the public site."],
      ["\u2014", "Allied partners", "Target", "Alliance count is not forecast on the public site."]
    ]
  };
  var figure = document.getElementById("figure");
  var brief = document.getElementById("brief");
  var briefK = document.getElementById("brief-k");
  var year = 2026;
  function draw() {
    var data = sets[year];
    box.innerHTML = "";
    data.forEach(function (m, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pick" + (i === 0 ? " on" : "");
      b.textContent = m[1];
      b.addEventListener("click", function () { select(i); });
      box.appendChild(b);
    });
    select(0);
  }
  function select(i) {
    var m = sets[year][i];
    figure.textContent = m[0];
    briefK.textContent = "Metric brief (" + year + ") \u2014 " + m[1];
    brief.textContent = m[3];
    box.querySelectorAll(".pick").forEach(function (el, n) {
      el.classList.toggle("on", n === i);
    });
  }
  document.getElementById("y2026").addEventListener("click", function () {
    year = 2026;
    document.getElementById("y2026").classList.add("on");
    document.getElementById("y2027").classList.remove("on");
    draw();
  });
  document.getElementById("y2027").addEventListener("click", function () {
    year = 2027;
    document.getElementById("y2027").classList.add("on");
    document.getElementById("y2026").classList.remove("on");
    draw();
  });
  draw();
})();
