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
      fontFamily: "Poppins, sans-serif",
      fontWeightBold: 900,
      fontWeightMedium: 500,
      fontSize: 12,
      h4: {
        fontWeight: 300
      },
      h3: {
        fontWeight: 300
      },
      h1: {
        fontWeight: 700
      },
      h2: {
        fontWeight: 700
      }
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