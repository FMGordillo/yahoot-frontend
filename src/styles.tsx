import { css, Global } from "@emotion/react";

/**
 * @see https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
 */
const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const globalStyles = (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
      }

      html,
      body,
      #__next {
        height: 100%;
      }

      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      img,
      picture,
      video,
      canvas,
      svg {
        display: block;
        max-width: 100%;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
      }

      #root,
      #__next {
        isolation: isolate;
      }
    `}
  />
);

export const mediaQuery = (key: keyof typeof BREAKPOINTS) =>
  `@media (max-width: ${BREAKPOINTS[key]}px)`;
