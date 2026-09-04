import { entries } from "/kubedaily/entries.js";

const root = document.querySelector("#kube-tools");
const starCounter = document.querySelector("#kube-github-stars");
const tags = ["All", ...new Set(entries.map(({ tag }) => tag).filter(Boolean).sort())];
let query = "";
let selectedTag = "All";

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function githubRepository(link) {
  try {
    const url = new URL(link);
    const parts = url.hostname === "github.com" ? url.pathname.split("/").filter(Boolean) : [];

    if (parts.length >= 2) {
      return [parts[0], parts[1].replace(/\.git$/, "")];
    }
  } catch (_) {}

  return null;
}

function githubStars(entry) {
  const repository = githubRepository(entry.link);

  if (!repository) return "";

  const [owner, name] = repository.map(encodeURIComponent);
  const badge = `https://img.shields.io/github/stars/${owner}/${name}.svg?style=flat&label=stars&color=7c3aed`;

  return `<a class="kube-tool-stars" href="https://github.com/${owner}/${name}" target="_blank" rel="noreferrer" aria-label="View ${escape(entry.title)} stars on GitHub"><img loading="lazy" src="${badge}" alt="GitHub stars"></a>`;
}

function render() {
  const visible = entries.filter((entry) => {
    const haystack = `${entry.title} ${entry.description || ""} ${entry.tag || ""}`.toLowerCase();
    return (selectedTag === "All" || entry.tag === selectedTag) && haystack.includes(query.toLowerCase());
  });

  root.innerHTML = `<div class="kube-tool-controls"><label><span>Search</span><input type="search" placeholder="Search tools…" value="${escape(query)}"></label><label><span>Category</span><select>${tags.map((tag) => `<option ${tag === selectedTag ? "selected" : ""}>${escape(tag)}</option>`).join("")}</select></label></div><p class="kube-tool-count"><strong>${visible.length}</strong> matching tools</p><div class="kube-tool-grid">${visible.map((entry) => `<article class="kube-tool-card"><div class="kube-tool-card-meta"><p class="kube-label">${escape(entry.tag || "Tool")}</p>${githubStars(entry)}</div><h2>${escape(entry.title)}</h2><p>${escape(entry.description || "No description provided.")}</p><a href="${escape(entry.link)}" target="_blank" rel="noreferrer">Visit official project <span aria-hidden="true">↗</span></a></article>`).join("") || `<p class="kube-tool-empty">No tools match that search. Try a different keyword or category.</p>`}</div>`;
  root.querySelector("input").addEventListener("input", (event) => { query = event.target.value; render(); });
  root.querySelector("select").addEventListener("change", (event) => { selectedTag = event.target.value; render(); });
}

render();

if (starCounter) {
  fetch("https://api.github.com/repos/kubernetesdaily/kubernetesdaily.github.io")
    .then((response) => response.ok ? response.json() : null)
    .then((repository) => {
      if (repository && Number.isFinite(repository.stargazers_count)) {
        starCounter.textContent = `${repository.stargazers_count.toLocaleString()} GitHub stars`;
      }
    })
    .catch(() => {});
}
