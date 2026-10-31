// Progressive enhancements shared by Phoenix and the static Pages export.
// Reading-width preference persists across visits.
const readingToggle = document.querySelector('[data-reading-toggle]');
if (readingToggle) {
  const label = readingToggle.querySelector('span');
  readingToggle.hidden = false;
  const apply = wide => {
    document.body.classList.toggle('kube-wide-reading', wide);
    label.textContent = wide ? 'wide' : 'standard';
    readingToggle.setAttribute('aria-pressed', String(wide));
    try { localStorage.setItem('kubedaily-reading-width', wide ? 'wide' : 'standard'); } catch {}
  };
  let wide = false;
  try { wide = localStorage.getItem('kubedaily-reading-width') === 'wide'; } catch {}
  apply(wide);
  readingToggle.addEventListener('click', () => apply(!document.body.classList.contains('kube-wide-reading')));
}

// All cards remain available when JavaScript is disabled.
for (const library of document.querySelectorAll('[data-content-library]')) {
  const input = library.querySelector('[data-library-search]');
  const cards = [...library.querySelectorAll('[data-library-card]')];
  const contents = cards.map(card => card.textContent.toLocaleLowerCase());
  library.querySelector('[data-library-controls]').hidden = false;
  input.addEventListener('input', () => {
    const words = input.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach((card, i) => {
      card.hidden = !words.every(word => contents[i].includes(word));
      if (!card.hidden) visible++;
    });
    library.querySelector('[data-library-count]').textContent = `${visible} of ${cards.length} shown`;
    library.querySelector('[data-library-empty]').hidden = visible !== 0;
  });
}
const path = location.pathname.replace(/\/$/, "") || "/";
for (const link of document.querySelectorAll('.kube-nav-link')) {
  const target = new URL(link.href).pathname.replace(/\/$/, "") || "/";
  if (target === path || (target !== "/" && path.startsWith(target + "/"))) link.setAttribute("aria-current", "page");
}

const status = document.createElement("p");
status.className = "kube-copy-status";
status.setAttribute("role", "status");
status.setAttribute("aria-live", "polite");
if (document.querySelector('.kube-markdown pre')) document.querySelector('main')?.append(status);

function isMermaidElement(pre, code) {
  if (code && (code.classList.contains('language-mermaid') || code.className.includes('mermaid'))) return true;
  if (pre && (pre.classList.contains('language-mermaid') || pre.classList.contains('mermaid') || pre.className.includes('mermaid'))) return true;
  return false;
}

for (const pre of document.querySelectorAll('.kube-markdown pre')) {
  const code = pre.querySelector('code');
  if (!code || !navigator.clipboard) continue;
  if (isMermaidElement(pre, code)) continue; // Handled by Pele Mermaid renderer below
  const wrapper = document.createElement('div');
  wrapper.className = 'kube-code-wrapper';
  pre.before(wrapper); wrapper.append(pre);
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'kube-copy-code'; button.textContent = 'Copy code';
  button.setAttribute('aria-label', 'Copy this code block');
  wrapper.prepend(button);
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = 'Copied'; status.textContent = 'Code copied. Review it before running in a disposable environment.';
    } catch { button.textContent = 'Select code to copy'; status.textContent = 'Clipboard unavailable. Select the code and copy manually.'; }
    setTimeout(() => { button.textContent = 'Copy code'; }, 2500);
  });
}

// -------------------------------------------------------------
// Pele (obsidianmd/pele) Mermaid Diagram Integration
// -------------------------------------------------------------
function renderPeleDiagrams() {
  if (typeof pele === 'undefined') {
    // Retry once Pele script is ready
    setTimeout(renderPeleDiagrams, 100);
    return;
  }

  const selector = '.kube-markdown pre code.language-mermaid, .kube-markdown pre.language-mermaid, .kube-reading pre code.language-mermaid, .prose pre code.language-mermaid, pre.mermaid, div.mermaid';
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    const pre = el.tagName === 'CODE' ? el.parentElement : el;
    if (pre.dataset.peleRendered === 'true') return;
    pre.dataset.peleRendered = 'true';

    const sourceCode = (el.tagName === 'CODE' ? el.textContent : pre.textContent).trim();
    if (!sourceCode) return;

    // Build the diagram container card
    const card = document.createElement('div');
    card.className = 'kube-diagram-card';

    // Header bar
    const header = document.createElement('div');
    header.className = 'kube-diagram-header';
    header.innerHTML = `
      <span class="kube-diagram-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        Mermaid Diagram
      </span>
      <div class="kube-diagram-actions">
        <button type="button" class="kube-diagram-toggle-btn" title="Toggle Mermaid source code">Source</button>
        <button type="button" class="kube-diagram-copy-btn" title="Copy Mermaid syntax">Copy</button>
      </div>
    `;

    // Diagram render surface
    const body = document.createElement('div');
    body.className = 'kube-diagram-body';

    // Raw source container (hidden by default)
    const sourceView = document.createElement('pre');
    sourceView.className = 'kube-diagram-source';
    sourceView.style.display = 'none';
    sourceView.textContent = sourceCode;

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(sourceView);

    // Swap original <pre> with rendered card
    pre.parentNode.insertBefore(card, pre);
    pre.style.display = 'none';

    // Render SVG synchronously via Pele
    try {
      pele.mount(body, sourceCode);
    } catch (err) {
      console.warn('Pele failed to mount Mermaid diagram:', err);
      body.innerHTML = `<div class="kube-diagram-error"><p><strong>Diagram syntax issue:</strong> ${err.message || 'Unable to parse diagram'}</p></div>`;
      sourceView.style.display = 'block';
      const toggle = header.querySelector('.kube-diagram-toggle-btn');
      if (toggle) toggle.textContent = 'Hide';
    }

    // Toggle source visibility
    const toggleBtn = header.querySelector('.kube-diagram-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = sourceView.style.display === 'none';
        sourceView.style.display = isHidden ? 'block' : 'none';
        toggleBtn.textContent = isHidden ? 'Hide' : 'Source';
      });
    }

    // Copy source code
    const copyBtn = header.querySelector('.kube-diagram-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(sourceCode);
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
        } catch {
          copyBtn.textContent = 'Failed';
        }
      });
    }
  });
}

// Initial mount and LiveView navigation hooks
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPeleDiagrams);
} else {
  renderPeleDiagrams();
}

window.addEventListener('phx:page-loading-stop', () => {
  setTimeout(renderPeleDiagrams, 50);
});
