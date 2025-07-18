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
});
