import { entries } from "/kubedaily/entries.js";

const root = document.querySelector("#kube-tools");
const tags = [...new Set(entries.map(({ tag }) => tag).filter(Boolean))].sort();
const pageSize = 24;
let page = 1;

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function projectUrl(value) {
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}

function card(entry) {
  const link = projectUrl(entry.link);
  const url = link ? new URL(link) : null;
  const parts = url?.hostname === "github.com" ? url.pathname.split("/").filter(Boolean) : [];
  const badge = parts.length >= 2 ? `<img class="kube-stars-image" loading="lazy" width="95" height="20" src="https://img.shields.io/github/stars/${encodeURIComponent(parts[0])}/${encodeURIComponent(parts[1].replace(/\.git$/, ""))}.svg?style=flat&label=stars&color=7c3aed" alt="GitHub stars">` : "";
  return `<article class="kube-tool-card"><div class="kube-tool-card-meta"><p class="kube-label">${escape(entry.tag || "Tool")}</p>${badge}</div><h2>${escape(entry.title)}</h2><p>${escape(entry.description || "Explore this project's official documentation.")}</p>${link ? `<a href="${escape(link)}" target="_blank" rel="noopener noreferrer">Visit official project <span aria-hidden="true">↗</span></a>` : '<p>Project link unavailable.</p>'}</article>`;
}

if (root) {
  // Controls are created once. Only results change, preserving focus and selection.
  root.innerHTML = `<form class="kube-tool-controls" role="search" aria-label="Find cloud-native tools"><label for="tool-query">Search tools<input id="tool-query" name="q" type="search" placeholder="Try Kubernetes, GitOps, monitoring…" autocomplete="off"></label><label for="tool-category">Category<select id="tool-category" name="category"><option value="">All categories</option>${tags.map(tag => `<option value="${escape(tag)}">${escape(tag)}</option>`).join("")}</select></label><label for="tool-sort">Sort by<select id="tool-sort" name="sort"><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option></select></label></form><div class="kube-results-toolbar"><p class="kube-tool-count" role="status" aria-live="polite" aria-atomic="true"></p><button type="button" class="kube-filter-reset">Clear filters</button></div><div class="kube-tool-grid" id="tool-results"></div><div class="kube-directory-more"><button type="button" class="kube-button" id="tool-more">Show more tools</button></div>`;
  const form = root.querySelector("form");
  const input = root.querySelector("input");
  const category = root.querySelector("#tool-category");
  const sort = root.querySelector("#tool-sort");
  const results = root.querySelector("#tool-results");
  const count = root.querySelector('[role="status"]');
  const more = root.querySelector("#tool-more");
  const clear = root.querySelector(".kube-filter-reset");

  function restore() {
    const params = new URLSearchParams(location.search);
    input.value = params.get("q") || "";
    category.value = tags.includes(params.get("category")) ? params.get("category") : "";
    sort.value = params.get("sort") === "za" ? "za" : "az";
    page = 1;
  }
  function updateUrl() {
    const url = new URL(location.href);
    for (const [key, value] of [["q", input.value], ["category", category.value], ["sort", sort.value === "az" ? "" : sort.value]]) {
      if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    }
    history.replaceState(null, "", url);
  }
  function render({ append = false } = {}) {
    const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const visible = entries.filter(entry => {
      const haystack = `${entry.title} ${entry.description || ""} ${entry.tag || ""}`.toLowerCase();
      return (!category.value || entry.tag === category.value) && words.every(word => haystack.includes(word));
    }).sort((a, b) => (sort.value === "za" ? -1 : 1) * a.title.localeCompare(b.title));
    const limit = Math.min(page * pageSize, visible.length);
    const cards = visible.slice(append ? (page - 1) * pageSize : 0, limit).map(card).join("");
    if (append) results.insertAdjacentHTML("beforeend", cards);
    else results.innerHTML = cards || '<div class="kube-tool-empty"><h2>No matching tools</h2><p>Try a broader keyword or use Clear filters to start again.</p></div>';
    count.textContent = `Showing ${limit} of ${visible.length} matching tools · ${entries.length} in the directory`;
    more.hidden = limit >= visible.length;
    clear.disabled = !input.value && !category.value && sort.value === "az";
    if (append) {
      const firstNewLink = results.children[(page - 1) * pageSize]?.querySelector("a");
      firstNewLink?.focus({ preventScroll: true });
    }
  }
  form.addEventListener("submit", event => event.preventDefault());
  input.addEventListener("input", () => { page = 1; updateUrl(); render(); });
  for (const select of [category, sort]) select.addEventListener("change", () => { page = 1; updateUrl(); render(); });
  clear.addEventListener("click", () => { input.value = ""; category.value = ""; sort.value = "az"; page = 1; updateUrl(); render(); input.focus(); });
  more.addEventListener("click", () => { page += 1; render({ append: true }); });
  window.addEventListener("popstate", () => { restore(); render(); });
  restore(); render();
}

const starCounter = document.querySelector("#kube-github-stars");
if (starCounter) {
  fetch("https://api.github.com/repos/kubernetesdaily/kubernetesdaily.github.io", { signal: AbortSignal.timeout(5000) })
    .then(response => response.ok ? response.json() : null)
    .then(repository => { if (Number.isFinite(repository?.stargazers_count)) starCounter.textContent = `${repository.stargazers_count.toLocaleString()} GitHub stars`; })
    .catch(() => {});
}
