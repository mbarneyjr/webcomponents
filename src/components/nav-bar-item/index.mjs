import { LitElement, css, html } from 'lit';

export class NavBarItem extends LitElement {
  /**
   * @param {string} href The href of the link.
   */
  constructor(href) {
    super();
    this.href = href || this.getAttribute('href');
  }

  static properties = {
    href: { type: String, reflect: true },
  };

  static styles = css`
    .padded {
      display: flex;
      padding: 1rem;
      justify-content: flex-end;
    }
    a {
      text-decoration: none;
    }
  `;

  render() {
    if (this.href) {
      return html`<style></style>
        <a class="padded" href="${this.href}">
          <slot></slot>
        </a>`;
    }
    return html`
      <div class="padded">
        <slot></slot>
      </div>
    `;
  }
}
window.customElements.define('nav-bar-item', NavBarItem);
