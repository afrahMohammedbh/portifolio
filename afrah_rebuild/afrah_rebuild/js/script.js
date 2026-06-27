/* AFRAH MOHAMMED — script.js */

/* 1. TYPED TEXT */
const words = ["Data Analyst", "Business Analyst", "Web Developer", "CS Student"];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById("typed");
function type() {
  if (!el) return;
  const w = words[wi];
  el.textContent = deleting ? w.slice(0, ci--) : w.slice(0, ci++);
  let t = deleting ? 50 : 88;
  if (!deleting && ci > w.length)  { t = 1800; deleting = true; }
  if (deleting  && ci < 0)         { deleting = false; wi = (wi+1) % words.length; t = 300; }
  setTimeout(type, t);
}
type();

/* 2. NAVBAR SCROLL */
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 55));

/* 3. MOBILE MENU */
const mb  = document.getElementById("menuBtn");
const nl  = document.getElementById("navLinks");
mb.addEventListener("click", () => nl.classList.toggle("open"));
nl.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nl.classList.remove("open")));

/* 4. SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* 5. SCROLL REVEAL */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => io.observe(el));

/* 6. ACTIVE NAV */
const secs = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let cur = "";
  secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  navAs.forEach(a => {
    const on = a.getAttribute("href") === `#${cur}`;
    a.style.background = on ? "var(--rose-soft)" : "";
    a.style.color      = on ? "var(--rose-deep)" : "";
  });
});

/* 7. CONTACT FORM */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const btn = form.querySelector(".btn-send");
    const txt = btn.querySelector(".bs-text");
    const ico = btn.querySelector(".bs-icon");
    txt.textContent = "Sent!"; ico.textContent = "✅";
    btn.disabled = true;
    btn.style.background = "linear-gradient(135deg,#34d399,#059669)";
    setTimeout(() => {
      txt.textContent = "Send Message"; ico.textContent = "✈️";
      btn.disabled = false; btn.style.background = ""; form.reset();
    }, 3000);
  });
}
