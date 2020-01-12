import { createMuiTheme } from '@material-ui/core';

export function getTheme(mode: "light"|"dark" = "light") {
  return createMuiTheme({
    palette: {
      type: mode
    },
    typography: {
      fontFamily: "Heebo, sans-serif",
      fontWeightBold: 900,
      fontWeightMedium: 500,
      fontSize: 12
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': {
            fontFamily: "Heebo, sans-serif"
          },
        },
      },
    },
  });
}