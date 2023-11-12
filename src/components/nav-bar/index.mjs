import { LitElement, css, html } from 'lit';

const DEFAULT_BREAKPOINT = '512px';

/**
 * A `nav-bar` component that is responsive and will render a hamburger toggle when the screen is small.
 * The breakpoint can be set by setting the `breakpoint` attribute.
 * When the screen is small, the links will be hidden and the hamburger toggle will be shown.
 * When the hamburger toggle is clicked, the links will be shown.
 * @example
 * <nav-bar breakpoint="768px">
 *  <span slot="title">My Title</span>
 *  <a href="#">Link 1</a>
 *  <a href="#">Link 2</a>
 *  <a href="#">Link 3</a>
 * </nav-bar>
 */
export class NavBar extends LitElement {
  /**
   * @param {string} breakpoint The breakpoint at which the navbar will render a hamburger toggle.
   */
  constructor(breakpoint) {
    super();
    this.breakpoint = breakpoint || this.getAttribute('breakpoint') || DEFAULT_BREAKPOINT;
  }

  static properties = {
    breakpoint: { type: String, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      background: transparent;
      line-height: normal;
    }

    .navbar {
      width: 100%;
      display: flex;
      /* force the right side elements to be on a new line when expanded on mobile */
      flex-wrap: wrap;
      /* ensure that the toggle is on the right edge and the title is on the left edge */
      justify-content: space-between;
    }

    /* navbar hamburger toggle styles */
    .navbar-toggle {
      cursor: pointer;
      /* when shown, display will be flex */
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
    }
    .navbar-toggle span {
      display: block;
      width: 32px;
      height: 1px;
      margin: 2px;
      background-color: black;
      transition: 0.1s;
    }
    .navbar-toggle-open span:nth-child(1) {
      transform: rotate(-45deg) translate(0px, 7px);
      width: 24px;
    }
    .navbar-toggle-open span:nth-child(2) {
      opacity: 0;
    }
    .navbar-toggle-open span:nth-child(3) {
      transform: rotate(45deg) translate(0px, -7px);
      width: 24px;
    }
  `;

  render() {
    return html`
      <style>
        /* navbar link styles */
        .left,
        .right {
          /* use flex container for links */
          display: flex;
        }
        /* desktop styles */
        .navbar-toggle {
          display: none;
        }
        /* mobile styles */
        @media only screen and (max-width: ${this.breakpoint || DEFAULT_BREAKPOINT}) {
          .right {
            /* hide the right side elements by default */
            display: none;
          }
          .navbar-toggle {
            /* show the toggle */
            display: flex;
          }
          .expand-rightside-elements {
            /* ensure that the links are rendered below the navbar */
            flex-basis: 100%;
            /* render each element on the right side of the screen when expanded */
            text-align: right;
            /* render each link in a new line */
            display: flex;
            flex-direction: column;
          }
        }
      </style>
      <nav class="navbar" part="navbar">
        <div class="left">
          <slot name="left"></slot>
        </div>
        <button class="navbar-toggle" @click="${() => this.navBarToggle()}" part="toggle">
          <span part="toggle-line"></span>
          <span part="toggle-line"></span>
          <span part="toggle-line"></span>
        </button>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </nav>
    `;
  }

  navBarToggle() {
    this.shadowRoot?.querySelector('.right')?.classList.toggle('expand-rightside-elements');
    this.shadowRoot?.querySelector('.navbar-toggle')?.classList.toggle('navbar-toggle-open');
  }
}
window.customElements.define('nav-bar', NavBar);
