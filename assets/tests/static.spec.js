const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route('https://api.github.com/**', route => route.abort());
  await page.route('https://img.shields.io/**', route => route.abort());
});

test('homepage Docker CTA resolves to the exported lab', async ({ page, request }) => {
  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  const cta = page.getByRole('link', { name: 'Start with Docker' });
  await expect(cta).toHaveAttribute('href', '/labs/Learn-Docker/');
  const lab = await request.get(await cta.getAttribute('href'));
  expect(lab.status()).toBe(200);
  await cta.click();
  await expect(page.getByRole('heading', { name: 'Learn Docker', exact: true }).first()).toBeVisible();
});

test('tools filters render and typing preserves input focus', async ({ page }) => {
  const response = await page.goto('/tools/');
  expect(response.status()).toBe(200);
  const search = page.getByRole('searchbox', { name: 'Search tools' });
  await expect(search).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Category', exact: true })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Sort by', exact: true })).toBeVisible();
  await search.pressSequentially('kubernetes', { delay: 30 });
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('kubernetes');
  await expect(page).toHaveURL(/q=kubernetes/);
  await expect(page.locator('.kube-tool-card').first()).toBeVisible();
  await page.reload();
  await expect(search).toHaveValue('kubernetes');
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(search).toHaveValue('');
  await expect(search).toBeFocused();
  await expect(page.locator('.kube-tool-card')).toHaveCount(24);
  await page.getByRole('button', { name: 'Show more tools' }).click();
  await expect(page.locator('.kube-tool-card')).toHaveCount(48);
  await page.getByRole('combobox', { name: 'Category', exact: true }).selectOption('CI/CD Tools');
  await expect(page).toHaveURL(/category=CI/);
  await page.getByRole('combobox', { name: 'Sort by', exact: true }).selectOption('za');
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Sort by', exact: true })).toHaveValue('za');
  await search.fill('no-matching-tool-xyz');
  await expect(page.getByRole('heading', { name: 'No matching tools' })).toBeVisible();
});

test('mobile navigation, skip link and homepage search work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('.kube-nav-link[aria-current="page"]')).toHaveText('Home');
  await page.getByRole('searchbox', { name: 'Looking for a tool instead?' }).fill('helm');
  await page.getByRole('button', { name: 'Find tools' }).click();
  await expect(page.getByRole('searchbox', { name: 'Search tools' })).toHaveValue('helm');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('lab code copy does not execute commands', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/labs/Learn-Docker/');
  const code = await page.locator('.kube-markdown pre code').first().textContent();
  await page.getByRole('button', { name: 'Copy this code block' }).first().click();
  await expect(page.locator('.kube-copy-status')).toContainText('Code copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code);
});

test('new guides expose SEO, outlines, contribution links and mobile reading', async ({ page, request }) => {
  for (const slug of ['docker-image-build-guide', 'kubernetes-requests-limits', 'kubernetes-probes-guide']) {
    await page.goto(`/blog/${slug}/`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://kubedaily.com/blog/${slug}/`);
    const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(data['@type']).toBe('Article');
    expect(data.datePublished).toMatch(/^2026-09-/);
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
    await expect(page.getByRole('link', { name: 'Edit this guide on GitHub' })).toHaveAttribute('href', new RegExp(`/edit/main/priv/static/kubedaily/blog/${slug}.md$`));
    const anchor = page.getByRole('navigation', { name: 'On this page' }).locator('a').first();
    const target = await anchor.getAttribute('href');
    await anchor.click();
    await expect(page.locator(target)).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto('/labs/Learn-kubectl/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Edit this lab on GitHub' })).toBeVisible();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/labs/Learn-kubectl/');
  expect(sitemap).not.toContain('/elixir');
  const feed = await (await request.get('/rss.xml')).text();
  expect(feed).toContain('/blog/docker-image-build-guide/');
  expect(feed).not.toMatch(/undefined|blog\/blog|qwen-coder-models/);
});
