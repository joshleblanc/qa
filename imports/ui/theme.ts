import { createMuiTheme } from '@material-ui/core';

export function getTheme(mode: "light"|"dark" = "light") {
  return createMuiTheme({
    palette: {
      type: mode,
      primary: {
        main: "#EB5757"
      },
      secondary: {
        main: "#01A8D5"
      },
      background: {
        default: mode === "light" ? "#DFDFDF" : "#202020"
      }
    },
    typography: {
      fontFamily: "Heebo, sans-serif",
      fontWeightBold: 900,
      fontWeightMedium: 500,
      fontSize: 12
    },
    shape: {
      borderRadius: 5
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