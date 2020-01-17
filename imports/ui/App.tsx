import * as React from 'react';
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
import {useStateStore} from "/imports/ui/stores/state-store";
import {useTracker} from "meteor/react-meteor-data";

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
    const store = useStateStore();
    const removeOtherElements = useTracker(() => store.removeOtherElements);

    return (
      <MuiThemeProvider theme={getTheme("dark")}>
        <SnackbarProvider>
          <div className={classes.root}>
            <CssBaseline />
            <BrowserRouter>
              {removeOtherElements ? (
                <Routes />
              ) : (
                <>
                  <Navbar />
                  <Container maxWidth="xl">
                    <main className={classes.content}>
                      <ToolbarPlaceholder />
                      <Routes />
                    </main>
                  </Container>
                </>
              )}
            </BrowserRouter>
          </div>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
};