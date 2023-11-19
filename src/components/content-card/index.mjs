import { LitElement, css, html } from 'lit';

/**
 * A `content-card` component.
 */
export class ContentCard extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
window.customElements.define('content-card', ContentCard);
