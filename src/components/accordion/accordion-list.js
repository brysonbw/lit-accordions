import { LitElement, css, html } from 'lit';

export class AccordionList extends LitElement {
  /**
   * @typedef {object} AccordionType
   * @property {number} id
   * @property {string} title
   * @property {string} content
   */

  /** @type {AccordionType[]} */
  _accordionData = [];

  constructor() {
    super();
    this._accordionData = [
      {
        id: 1,
        title: 'Section One',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra fermentum dolor. Curabitur lacinia imperdiet quam, ac faucibus dui rhoncus eu. Nulla ac interdum ante, sed condimentum risus. Duis at arcu nisl. Pellentesque porttitor convallis lectus eget mollis. Sed maximus sagittis odio, in malesuada massa eleifend sed. Vestibulum quis odio ac mi consectetur mollis. Fusce iaculis consectetur sapien, ornare vulputate risus aliquet non. Nulla tincidunt ligula ut tempus ornare. Duis dictum erat dui, nec lacinia lectus mattis id. Donec pulvinar eros eu dolor auctor tempus. ',
      },
      {
        id: 2,
        title: 'Section Two',
        content:
          'Etiam sagittis lorem est, quis convallis eros finibus at. Maecenas eget tristique purus, sit amet pretium dui. Aenean vel dapibus dui. Fusce tempus turpis mollis risus tempus, a aliquet dolor rhoncus. Vivamus placerat elementum leo, consequat porttitor odio vulputate a. Donec libero nisi, imperdiet vehicula dictum ut, consectetur pellentesque nunc. Morbi auctor neque in est tincidunt, egestas cursus nisi luctus. Nulla sit amet est quis elit cursus fermentum quis vitae orci. Proin in interdum enim. Sed nec ligula at libero commodo malesuada. Nunc volutpat laoreet risus vel consectetur.  ',
      },
      {
        id: 3,
        title: 'Section Three',
        content:
          'Nam mollis enim a massa porttitor, vel vulputate turpis commodo. Sed felis ex, ultrices non hendrerit sagittis, condimentum et risus. Donec varius blandit justo, in efficitur ante finibus id. Cras tristique sem venenatis augue ullamcorper tincidunt. Phasellus varius ornare magna nec eleifend. Nam ullamcorper libero ut dictum facilisis. Ut pulvinar tincidunt risus non suscipit. Nunc dui odio, cursus ut scelerisque id, cursus in lorem. Cras at aliquam nisl. Ut scelerisque pellentesque finibus. Proin efficitur, massa a condimentum condimentum, ex turpis luctus lectus, eget porta tellus turpis a neque. Aliquam tempor tempor neque, eget tristique ex dictum a. Ut dolor arcu, cursus in ante nec, elementum condimentum magna. ',
      },
    ];
  }

  /**
   * @returns {void}
   */
  firstUpdated() {
    // Open all accordions after the component's DOM has been created

    /** @type {NodeList | []} */
    const accordions = this._AccordionTitles || [];

    if (accordions.length) {
      accordions.forEach((accordion) => {
        if (accordion) {
          const accordionTitle = /** @type {HTMLButtonElement} */ (accordion);
          accordionTitle.classList.add('active');

          const accordionPanel = /** @type {HTMLElement | null} */ (
            accordionTitle.nextElementSibling
          );
          this._setAccordionPanelHeight(accordionPanel);
        }
      });
    }
  }

  /**
   * Get all accordion title elements
   * @returns {NodeList | null}
   * @private
   */
  get _AccordionTitles() {
    return this.renderRoot?.querySelectorAll('.accordion-title') || null;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      ${this._accordionData.map(
        (accordion) => html`
          <button
            id="accordion-${accordion.id}"
            class="accordion-title"
            @click=${this._toggleAccordion}
          >
            ${accordion.title}
          </button>
          <div class="accordion-panel">
            <p>${accordion.content}</p>
          </div>
        `
      )}
    `;
  }

  /**
   * Toggle accordion (open/close)
   * @param {Event} event
   * @returns {void}
   * @private
   */
  _toggleAccordion(event) {
    const accordionTitle = /** @type {HTMLButtonElement} */ (
      event?.currentTarget
    );
    accordionTitle.classList.toggle('active');

    const accordionPanel = /** @type {HTMLElement | null} */ (
      accordionTitle.nextElementSibling
    );
    this._setAccordionPanelHeight(accordionPanel);
  }

  /**
   * Set accordion panel height
   * @param {HTMLElement | null} panel - Accordion panel element
   * @returns {void}
   * @private
   */
  _setAccordionPanelHeight(panel) {
    if (panel) {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = '';
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    }
  }

  static styles = css`
    :host {
      display: block;
      margin-left: 10%;
      margin-right: 10%;
      flex: 1;
    }

    .accordion-title {
      background-color: #eee;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 15px;
      position: relative;
      padding-right: 30px;
    }

    .active,
    .accordion-title:hover {
      background-color: #ccc;
    }

    .accordion-title::after {
      content: '\u25BC'; /* Unicode - chevron down icon */
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
      font-size: 16px;
      line-height: 1;
      user-select: none;
      transition: transform 0.3s ease;
    }

    .accordion-title.active::after {
      content: '\u25B2'; /* Unicode - chevron up icon */
    }

    .accordion-panel {
      padding: 0 18px;
      background-color: white;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
      color: black;
    }
  `;
}

customElements.define('accordion-list', AccordionList);
