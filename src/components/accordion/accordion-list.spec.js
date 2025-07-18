import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import './accordion-list';

describe('accordion-list', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders 3 accordion titles and panels', async () => {
    document.body.innerHTML = `<accordion-list></accordion-list>`;

    const el = document.querySelector('accordion-list');
    expect(el).toBeDefined();
    if (el && 'updateComplete' in el) {
      await el.updateComplete;
    } else {
      throw new Error('accordion-list not found');
    }

    const shadow = el.shadowRoot;
    const titles = shadow?.querySelectorAll('.accordion-title');
    const panels = shadow?.querySelectorAll('.accordion-panel');

    if (titles && panels) {
      expect(titles.length).toBe(3);
      expect(panels.length).toBe(3);
      expect(titles[0].textContent).toContain('Section One');
    } else {
      throw new Error('accordion title(s) and panel(s) not found');
    }
  });

  it('sets maxHeight on firstUpdated (panels open)', async () => {
    document.body.innerHTML = `<accordion-list></accordion-list>`;

    const el = document.querySelector('accordion-list');
    if (el && 'updateComplete' in el) {
      await el.updateComplete;
    } else {
      throw new Error('accordion-list not found');
    }

    const panels = el?.shadowRoot?.querySelectorAll('.accordion-panel');

    if (panels) {
      panels.forEach((panel) => {
        const panelEl = /** @type {HTMLElement | null} */ (panel);
        expect(panelEl?.style.maxHeight).not.toBe('');
      });
    }
  });

  it('toggles panel maxHeight on title click', async () => {
    document.body.innerHTML = `<accordion-list></accordion-list>`;

    const el = document.querySelector('accordion-list');
    if (el && 'updateComplete' in el) {
      await el.updateComplete;
    } else {
      throw new Error('accordion-list not found');
    }

    const firstTitle = /** @type {HTMLButtonElement} */ (
      el?.shadowRoot?.querySelector('.accordion-title')
    );
    const firstPanel = /** @type {HTMLElement | null} */ (
      firstTitle?.nextElementSibling
    );

    // Collapse
    await userEvent.click(firstTitle);
    await el.updateComplete;
    expect(firstPanel?.style.maxHeight).toBe('');

    // Expand
    await userEvent.click(firstTitle);
    await el.updateComplete;
    expect(firstPanel?.style.maxHeight).not.toBe('');
  });

  it('exapnds all panels onClick "Select All" input checkbox', async () => {
    document.body.innerHTML = `<accordion-list></accordion-list>`;

    const el = document.querySelector('accordion-list');
    if (el && 'updateComplete' in el) {
      await el.updateComplete;
    } else {
      throw new Error('accordion-list not found');
    }

    // Find the "Select All" checkbox
    const selectAllInput = /** @type {HTMLInputElement | null} */ (
      el.shadowRoot?.querySelector('#accordion-select-all')
    );
    expect(selectAllInput).toBeTruthy();

    // On initial render all titles are selected - collaspe before selecting again
    const titles = el.shadowRoot?.querySelectorAll('.accordion-title');
    titles?.forEach((title) => title.classList.remove('active'));

    if (!selectAllInput) {
      throw new Error('"Select All" input checkbox not found');
    }

    // Click the select-all checkbox
    await userEvent.click(selectAllInput);
    await el.updateComplete;

    // Expect all panels to be expanded - maxHeight set
    const panels = el.shadowRoot?.querySelectorAll('.accordion-panel');
    panels?.forEach((panel) => {
      expect(panel instanceof HTMLElement && panel.style.maxHeight).not.toBe(
        ''
      );
    });
  });

  it('collapses all panels onClick "Unselect All" input checkbox', async () => {
    document.body.innerHTML = `<accordion-list></accordion-list>`;

    const el = document.querySelector('accordion-list');
    if (el && 'updateComplete' in el) {
      await el.updateComplete;
    } else {
      throw new Error('accordion-list not found');
    }

    // Find the "Unselect All" checkbox
    const unselectAllInput = /** @type {HTMLInputElement | null} */ (
      el.shadowRoot?.querySelector('#accordion-unselect-all')
    );
    expect(unselectAllInput).toBeTruthy();

    // Check if all accordion titles are selected on intial render first before collapsing
    const titles = el.shadowRoot?.querySelectorAll('.accordion-title');
    const allActive = titles
      ? Array.from(titles).every((title) => title.classList.contains('active'))
      : false;

    expect(allActive).toBe(true);

    if (!unselectAllInput) {
      throw new Error('"Unselect All" input checkbox not found');
    }

    // Click the unselect-all checkbox
    await userEvent.click(unselectAllInput);
    await el.updateComplete;

    // Expect all panels to be collapsed - maxHeight empty
    const panels = el.shadowRoot?.querySelectorAll('.accordion-panel');
    panels?.forEach((panel) => {
      if (panel instanceof HTMLElement) {
        expect(panel.style.maxHeight).toBe('');
      }
    });
  });
});
