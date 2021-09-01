import { css, createGlobalStyle } from 'styled-components/macro';

import { cssVariables } from './cssVariables';

const globalCss = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    user-select: none;
    -webkit-user-select: none; /* disable text select */
    -webkit-touch-callout: none; /* disable callout, image save panel (popup) */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent; /* "turn off" link highlight */
  }

  body {
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background: var(--main-background-color);
    color: var(--main-text-color);
  }

  h1,
  h2,
  h3 {
    text-rendering: optimizeLegibility;
  }

  a:focus {
    outline: 0; // Firefox (remove border on link click)
  }
`;

const GlobalStyles = createGlobalStyle`
  ${cssVariables}
  ${globalCss};
`;

export { GlobalStyles };
