const nav = document.getElementById("nav");
const links = document.getElementById("links");
document.getElementById("menu").addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

const onScroll = () => nav.classList.toggle("solid", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.18 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const sections = ["pathways", "holdings", "people", "contact"];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    document.querySelectorAll(".links a").forEach((a) => a.classList.toggle("on", a.dataset.nav === e.target.id));
  });
}, { rootMargin: "-40% 0px -50% 0px" });
sections.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
