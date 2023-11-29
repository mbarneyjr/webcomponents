import { LitElement, css, html } from 'lit';

/**
 * A `content-pill` component.
 */
export class ContentPill extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
window.customElements.define('content-pill', ContentPill);
