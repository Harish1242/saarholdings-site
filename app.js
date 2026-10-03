const nav = document.getElementById("nav");
const links = document.getElementById("links");
const menu = document.getElementById("menu");
if (menu) menu.addEventListener("click", () => links.classList.toggle("open"));
if (links) links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
const onScroll = () => nav && nav.classList.toggle("solid", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
