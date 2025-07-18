import { expect, test, beforeEach } from 'vitest';

import './footer-component';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('renders footer content', async () => {
  document.body.innerHTML = `<footer-component></footer-component>`;

  const el = document.querySelector('footer-component');
  expect(el).toBeDefined();
  if (el && 'updateComplete' in el) {
    await el.updateComplete;
  } else {
    throw new Error('footer-component not found');
  }

  const shadow = el.shadowRoot;
  const footer = shadow?.querySelector('footer');
  expect(footer).toBeTruthy();

  const litLink = /** @type {HTMLAnchorElement | null} */ (
    shadow?.querySelector('a.lit-link')
  );
  expect(litLink).toBeTruthy();
  expect(litLink?.href).toContain('https://lit.dev/');
  expect(litLink?.textContent).toBe('Lit');

  const githubLink = /** @type {HTMLAnchorElement | null} */ (
    shadow?.querySelector(
      'a[href="https://github.com/brysonbw/lit-accordions"]'
    )
  );
  expect(githubLink).toBeTruthy();

  const githubImg = /** @type {HTMLImageElement | null} */ (
    shadow?.querySelector('img.github-icon.icon')
  );
  expect(githubImg).toBeTruthy();
  expect(githubImg?.alt).toBe('github-logo');
  expect(githubImg?.src).toContain('github-logo');

  // Current year is rendered inside a <p> tag
  const paragraphElements = shadow?.querySelectorAll('p') ?? null;
  expect(paragraphElements).not.toBeNull();
  expect(paragraphElements?.length).toBeGreaterThan(0);
  expect(paragraphElements?.length).toEqual(1);

  const yearParagraph = paragraphElements?.item(0);
  expect(yearParagraph).toBeTruthy();
  expect(yearParagraph?.textContent).toContain(
    `© ${new Date().getFullYear()}`
  );

  // App title link and text
  const appTitleLink = /** @type {HTMLAnchorElement | null} */ (
    shadow?.querySelector('a[href="/"]')
  );

  expect(appTitleLink).toBeTruthy();
  expect(appTitleLink?.textContent).toBe('Lit Accordions');
});
