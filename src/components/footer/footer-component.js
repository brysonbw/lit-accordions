import { LitElement, css, html } from 'lit';
import githubLogo from '../../assets/img/github-logo.png';

export class FooterComponent extends LitElement {
  static properties = {
    _appTitle: { type: String, state: true },
  };

  constructor() {
    super();
    this._appTitle = 'Lit Accordions';
  }

  /**
   * Get current date year
   * @returns {string}
   * @private
   */
  get _currentYear() {
    const date = new Date();
    return date.getFullYear().toString();
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`<footer>
      <div class="footer-container">
        <div class="footer-text">
          Powered by
          <a href="https://lit.dev/" target="_blank" class="lit-link">Lit</a>
          •
          <a href="https://github.com/brysonbw/lit-accordions" target="_blank">
            <img class="github-icon icon" src=${githubLogo} alt="github-logo" />
          </a>
          •
          <p>© ${this._currentYear}</p>
          •
          <a href="/">${this._appTitle}</a>
        </div>
      </div>
    </footer> `;
  }

  static styles = css`
    .footer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 10vh;
      flex-wrap: wrap;
    }

    .footer-text {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      color: #acacac;
      font-size: 1rem;
    }

    a {
      text-decoration: none;
      color: #ffffff;
    }

    a:hover {
      text-decoration: underline;
    }

    .lit-link {
      color: #91ffff;
    }

    .github-icon {
      filter: brightness(0) invert(1);
      width: 24px;
      height: 24px;
    }

    @media only screen and (max-width: 640px) {
      .footer-text {
        font-size: 0.7rem;
      }
    }
  `;
}

customElements.define('footer-component', FooterComponent);
