const c = window.PORTFOLIO_CONTENT;
const esc = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const tags = (items) => items.map((item) => `<span class="tag">${esc(item)}</span>`).join("");

const themeButton = document.querySelector(".theme-toggle");
const updateThemeButton = () => {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.setAttribute("aria-pressed", String(!dark));
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeButton.querySelector(".theme-label").textContent = dark ? "Light" : "Dark";
};
updateThemeButton();
themeButton.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
  updateThemeButton();
});

document.querySelectorAll("[data-social]").forEach((link) => { link.href = c.social[link.dataset.social]; link.target = "_blank"; link.rel = "noopener noreferrer"; });
document.querySelectorAll("[data-cv]").forEach((link) => { link.href = c.cv; });
document.querySelectorAll("[data-email]").forEach((link) => { link.href = `mailto:${c.email}`; });
const phone = document.querySelector("#phone");
phone.textContent = c.showPhone ? c.phone : "";
phone.hidden = !c.showPhone;

document.querySelector("#capabilities").innerHTML = c.capabilities.map((item, index) => `<p class="border-green/20 px-4 py-5 text-center text-sm font-semibold uppercase tracking-[.12em] text-green ${index ? "border-l" : ""}">${esc(item)}</p>`).join("");

const visual = (type) => {
  const bars = type === "model" ? [34, 58, 78, 66, 88] : type === "water" ? [56, 72, 44, 82, 64] : type === "workflow" ? [45, 68, 84, 61, 76] : type === "compliance" ? [82, 62, 74, 48, 90] : [38, 72, 54, 86, 65];
  return `<div class="case-visual" role="img" aria-label="An anonymised conceptual data visual"><div class="visual-top"><span></span><span></span><span></span></div><div class="visual-grid">${bars.map((height, index) => `<i style="height:${height}%"><b>${String(index + 1).padStart(2, "0")}</b></i>`).join("")}</div><p>CONCEPTUAL VIEW · SAMPLE DATA</p></div>`;
};

document.querySelector("#projects").innerHTML = c.projects.map((project, index) => `<article class="project-row reveal">
  <div><p class="eyebrow text-gold-dark">${String(index + 1).padStart(2, "0")} · ${esc(project.category)}</p>${project.status ? `<span class="status">${esc(project.status)}</span>` : ""}<h3 class="mt-5 font-serif text-4xl leading-tight text-green">${esc(project.title)}</h3><p class="mt-5 max-w-2xl leading-7 text-muted">${esc(project.summary)}</p><button class="case-button focus-ring mt-7" type="button" data-project="${index}" aria-haspopup="dialog">Read case study <span aria-hidden="true">↗</span></button></div>
  ${visual(project.visual)}
</article>`).join("");

document.querySelector("#more-work").innerHTML = c.moreWork.map((item, index) => `<article class="bg-soft p-7"><p class="text-xs text-gold-dark">0${index + 1}</p><h3 class="mt-8 font-serif text-2xl text-green">${esc(item.title)}</h3><p class="mt-4 text-sm leading-6 text-muted">${esc(item.text)}</p></article>`).join("");

document.querySelector("#experience-list").innerHTML = c.experience.map((item) => `<article class="timeline-item reveal"><div><p class="text-sm font-semibold text-gold-dark">${esc(item.period)}</p></div><div><h3 class="font-serif text-3xl text-green">${esc(item.role)}</h3><p class="mt-1 font-semibold">${esc(item.company)}</p><p class="mt-5 max-w-3xl leading-7 text-muted">${esc(item.description)}</p><ul class="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">${item.points.map((point) => `<li class="border-l border-gold pl-4">${esc(point)}</li>`).join("")}</ul></div></article>`).join("");

document.querySelector("#research-list").innerHTML = c.research.map((item) => `<article class="research-card"><p class="eyebrow text-gold">${esc(item.label)}</p><h3 class="mt-6 font-serif text-2xl leading-snug">${esc(item.title)}</h3><p class="mt-5 text-xs leading-5 text-white/55">${esc(item.meta)}</p><p class="mt-5 text-sm leading-6 text-white/72">${esc(item.text)}</p>${item.link ? `<a class="mt-7 inline-block border-b border-gold pb-1 text-sm font-semibold text-gold" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.linkLabel)} ↗</a>` : ""}</article>`).join("");

document.querySelector("#skills-list").innerHTML = c.skills.map((item) => `<article class="skill-row"><h3 class="font-serif text-2xl text-green">${esc(item.group)}</h3><div class="flex flex-wrap gap-2">${tags(item.items)}</div></article>`).join("");
document.querySelector("#education-list").innerHTML = c.education.map((item) => `<article class="grid gap-3 border-t border-green/15 py-7 sm:grid-cols-[150px_1fr]"><p class="text-sm text-gold-dark">${esc(item.period)}</p><div><h3 class="font-serif text-2xl text-green">${esc(item.qualification)}</h3><p class="mt-1 text-muted">${esc(item.institution)} · ${esc(item.detail)}</p></div></article>`).join("");
document.querySelector("#note-topics").innerHTML = c.noteTopics.map((topic) => `<li class="py-3 text-sm text-muted">${esc(topic)}</li>`).join("");

const dialog = document.querySelector("#case-dialog");
const dialogContent = document.querySelector("#dialog-content");
document.querySelectorAll("[data-project]").forEach((button) => button.addEventListener("click", () => {
  const project = c.projects[Number(button.dataset.project)];
  dialogContent.innerHTML = `<p class="eyebrow text-gold-dark">${esc(project.category)}</p><h2 class="mt-5 font-serif text-4xl text-green">${esc(project.title)}</h2><div class="dialog-grid"><div><h3>Context and problem</h3><p>${esc(project.summary)}</p><p>${esc(project.problem)}</p><h3>Approach</h3><p>${esc(project.approach)}</p></div><div><h3>My contribution</h3><ul>${project.contribution.map((point) => `<li>${esc(point)}</li>`).join("")}</ul><h3>Outcome</h3><p>${esc(project.outcome)}</p><div class="mt-5 flex flex-wrap gap-2">${tags(project.tools)}</div></div></div>`;
  dialog.showModal();
}));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
menuButton.addEventListener("click", () => { const open = menuButton.getAttribute("aria-expanded") === "true"; menuButton.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("hidden", open); nav.classList.toggle("flex", !open); });
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { nav.classList.add("hidden"); nav.classList.remove("flex"); menuButton.setAttribute("aria-expanded", "false"); }));
document.querySelector("#year").textContent = new Date().getFullYear();

if (!("matchMedia" in window) || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
} else document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
