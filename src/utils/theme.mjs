/**
 * Set color scheme
 * @param {'dark' | 'light'} theme
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('color-scheme', theme);
}

/**
 * Swap color scheme
 */
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Initialize color scheme based on system preference or local storage
 */
export function init() {
  const prefersColorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  prefersColorSchemeMediaQuery.addEventListener('change', (e) => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    setTheme(newColorScheme);
  });

  const currentSystemScheme = prefersColorSchemeMediaQuery.matches ? 'dark' : 'light';
  const currentColorScheme =
    /** @type {'dark' | 'light'} */ (localStorage.getItem('color-scheme')) || currentSystemScheme;
  setTheme(currentColorScheme);
}
