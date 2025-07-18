import { LitElement, css, html } from 'lit';

export class AccordionList extends LitElement {
  /**
   * @typedef {object} AccordionType
   * @property {number} id
   * @property {string} title
   * @property {string} content
   */

  /**
   * @typedef {'select-all' | 'unselect-all'} AccordionSelectCheckboxType
   */

  static properties = {
    _accordionData: { type: Array, state: true },
    _accordionsSelected: { type: Array, state: true },
  };

  constructor() {
    super();
    /**
     * Mock static data for accordion example
     * @type {AccordionType[]}
     */
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

    /**
     * List of selected accordion (number) IDs
     * @type {number[]}
     */
    this._accordionsSelected = [];
  }

  /**
   * @returns {Promise<void>}
   */
  async firstUpdated() {
    // Open all accordions after the component's DOM has been created

    /** @type {NodeList | []} */
    const accordions = this._accordionTitles || [];
    /** @type {number[]} */
    let tempAccordionsSelected = [];

    if (accordions.length) {
      accordions.forEach((accordion) => {
        if (accordion) {
          const accordionTitle = /** @type {HTMLButtonElement} */ (accordion);
          accordionTitle.classList.add('active');

          this._setAccordionPanelHeight(
            /** @type {HTMLElement | null} */ (
              accordionTitle.nextElementSibling
            )
          );

          // Collect accordion IDs
          const id = Number(accordionTitle.id.split('-')[1]);
          tempAccordionsSelected.push(id);
        }
      });
    }

    // After the initial render completes
    await this.updateComplete.then(() => {
      // Toggle 'select-all' accordion input checked attribute value on init
      this._accordionsSelected = tempAccordionsSelected;

      const isAllSelectedOnInit = this._accordionsSelected.every((id) =>
        this._accordionData.map((item) => item.id).includes(id)
      );

      if (this._accordionSelectAllInput) {
        this._accordionSelectAllInput.checked = isAllSelectedOnInit;
      }
    });
  }

  /**
   * @param {Map<string | number | symbol, unknown>} changedProperties
   * @returns {void}
   */
  updated(changedProperties) {
    // Watch changed properties

    // '_accordionsSelected' property
    if (changedProperties.has('_accordionsSelected')) {
      const accordionsSelectedValue = this._accordionsSelected;

      const selectedCount = accordionsSelectedValue.length;
      const allSelected = selectedCount === 3;
      const noneSelected = selectedCount === 0;

      const selectAllInput = this._accordionSelectAllInput;
      const unselectAllInput = this._accordionUnselectAllInput;

      // Toggle accordion select inputs disabled and checked state
      if (selectAllInput) {
        selectAllInput.disabled = allSelected;

        if (allSelected) {
          selectAllInput.checked = true;
        } else {
          selectAllInput.checked = false;
        }
      }

      if (unselectAllInput) {
        unselectAllInput.disabled = noneSelected;

        if (noneSelected) {
          unselectAllInput.checked = true;
        } else {
          unselectAllInput.checked = false;
        }
      }
    }
  }

  /**
   * Get all accordion title elements
   * @returns {NodeList | null}
   * @private
   */
  get _accordionTitles() {
    return this.renderRoot?.querySelectorAll('.accordion-title');
  }

  /**
   * Get accordion 'select all' input (checkbox) element
   * @returns {HTMLInputElement | null}
   * @private
   */
  get _accordionSelectAllInput() {
    return this.renderRoot?.querySelector('#accordion-select-all');
  }

  /**
   * Get accordion 'unselect all' input (checkbox) element
   * @returns {HTMLInputElement | null}
   * @private
   */
  get _accordionUnselectAllInput() {
    return this.renderRoot?.querySelector('#accordion-unselect-all');
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <!-- Accordion Select Checkboxes -->
      <div class="accordion-select-checkboxes">
        <label class="accordion-select">
          <input
            @click=${
              /**
               * @param {Event} event
               * @returns {void}
               */
              (event) => this._onAccordionSelect(event, 'select-all')
            }
            type="checkbox"
            id="accordion-select-all"
            name="accordion-select-all"
          />
          <span>Select All</span>
        </label>

        <label class="accordion-select">
          <input
            @click=${
              /**
               * @param {Event} event
               * @returns {void}
               */
              (event) => this._onAccordionSelect(event, 'unselect-all')
            }
            type="checkbox"
            id="accordion-unselect-all"
            name="accordion-unselect-all"
          />
          <span>Unselect All</span></label
        >
      </div>
      <!-- Accordion Items -->
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
   * Handles accordion input (checkbox) selection - select/unselect all
   * @param {Event} event
   * @param {AccordionSelectCheckboxType} type
   * @returns {void}
   * @private
   */
  _onAccordionSelect(event, type) {
    const checkbox = /** @type {HTMLInputElement} */ (event?.currentTarget);
    if (
      checkbox.tagName.toLowerCase() === 'input' &&
      checkbox.id === `accordion-${type}`
    ) {
      /** @type {number[]} */
      const updatedAccordionsSelected = [];
      const accordions = this._accordionTitles || [];

      //! No accordion elements found
      if (!accordions.length) {
        alert('Unable to apply select action. Please try again');
        return;
      }

      accordions.forEach((accordion) => {
        const accordionTitle = /** @type {HTMLButtonElement} */ (accordion);
        const id = Number(accordionTitle.id.split('-')[1]);
        const active = accordionTitle.classList.contains('active');

        // Toggle active class and panels for selected or unselected accordions
        if (type === 'select-all') {
          if (!active) {
            accordionTitle.classList.add('active');
            this._setAccordionPanelHeight(
              /** @type {HTMLElement | null} */ (
                accordionTitle.nextElementSibling
              )
            );
          }
          updatedAccordionsSelected.push(id);
        }

        if (type === 'unselect-all') {
          if (active) {
            accordionTitle.classList.remove('active');
            this._setAccordionPanelHeight(
              /** @type {HTMLElement | null} */ (
                accordionTitle.nextElementSibling
              )
            );
          }
        }
      });

      // Update accordions selected state
      this._accordionsSelected =
        type === 'select-all' ? updatedAccordionsSelected : [];
    }
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

    const active = accordionTitle.classList.toggle('active');
    const id = Number(accordionTitle.id.split('-')[1]);

    // Update accordions selected state
    if (active) {
      this._accordionsSelected = [...this._accordionsSelected, id];
    } else {
      this._accordionsSelected = this._accordionsSelected.filter(
        (item) => item !== id
      );
    }

    this._setAccordionPanelHeight(
      /** @type {HTMLElement | null} */ (accordionTitle.nextElementSibling)
    );
  }

  /**
   * Set accordion panel height
   * @param {HTMLElement | null} panel - Accordion panel element
   * @returns {void}
   * @private
   */
  _setAccordionPanelHeight(panel) {
    if (!panel) return;
    panel.style.maxHeight = panel.style.maxHeight
      ? ''
      : `${panel.scrollHeight}px`;
  }

  static styles = css`
    :host {
      display: block;
      margin-left: 10%;
      margin-right: 10%;
      flex: 1;
    }

    .accordion-select-checkboxes {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .accordion-select-checkboxes > label {
      margin-right: 15px;
    }

    .accordion-select > input:hover {
      cursor: pointer;
    }

    .accordion-select input:disabled + span {
      color: gray;
      cursor: not-allowed;
      opacity: 0.6;
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
