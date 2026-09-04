import { entries } from "/kubedaily/entries.js";

const root = document.querySelector("#kube-tools");
const tags = ["All", ...new Set(entries.map(({ tag }) => tag).filter(Boolean).sort())];
let query = "";
let selectedTag = "All";

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function render() {
  const visible = entries.filter((entry) => {
    const haystack = `${entry.title} ${entry.description || ""} ${entry.tag || ""}`.toLowerCase();
    return (selectedTag === "All" || entry.tag === selectedTag) && haystack.includes(query.toLowerCase());
  });

  root.innerHTML = `<div class="kube-tool-controls"><input type="search" placeholder="Search tools…" value="${escape(query)}"><select>${tags.map((tag) => `<option ${tag === selectedTag ? "selected" : ""}>${escape(tag)}</option>`).join("")}</select></div><p class="kube-tool-count">${visible.length} tools</p><div class="kube-tool-grid">${visible.map((entry) => `<article class="kube-card"><p class="kube-label">${escape(entry.tag || "Tool")}</p><h2>${escape(entry.title)}</h2><p>${escape(entry.description || "No description provided.")}</p><a href="${escape(entry.link)}" target="_blank" rel="noreferrer">Visit project →</a></article>`).join("")}</div>`;
  root.querySelector("input").addEventListener("input", (event) => { query = event.target.value; render(); });
  root.querySelector("select").addEventListener("change", (event) => { selectedTag = event.target.value; render(); });
}

render();
