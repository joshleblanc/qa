import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Navbar from './components/Navbar';
import { BrowserRouter }  from 'react-router-dom';
import Routes from "/imports/ui/Routes";
import ToolbarPlaceholder from "/imports/ui/components/ToolbarPlaceholder";
import {SnackbarProvider} from "notistack";
import { MuiThemeProvider } from '@material-ui/core';
import { getTheme } from './theme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  }
}));

export default () => {
    const classes = useStyles();
    return(
      <MuiThemeProvider theme={getTheme()}>
        <SnackbarProvider>
          <div className={classes.root}>
            <CssBaseline />
            <BrowserRouter>
              <Navbar />
              <Container maxWidth="xl">
                <main className={classes.content}>
                  <ToolbarPlaceholder />
                  <Routes />
                </main>
              </Container>
            </BrowserRouter>
          </div>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
};