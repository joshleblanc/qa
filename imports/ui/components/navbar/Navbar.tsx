import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Toolbar, ListItem, ListItemText, ListItemIcon, List, IconButton, Drawer, Divider, AppBar, Hidden } from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/PowerSettingsNewTwoTone";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import CreateIcon from '@material-ui/icons/CreateTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';
import LogInIcon from '@material-ui/icons/LockOpenTwoTone';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import ToolbarPlaceholder from "/imports/ui/components/ToolbarPlaceholder";
import { useStateStore } from '../../stores/state-store';
import { useTracker } from 'meteor/react-meteor-data';
import Grow from "/imports/ui/components/Grow";
import AccountButtons from "/imports/ui/components/navbar/AccountButtons";
import { Meteor } from 'meteor/meteor';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appTitle: {
      fontWeight: 900
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      borderRight: 'none'
    },
    drawerRoot: {
    }
  }),
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: Element;
}

export default function ResponsiveDrawer(props: ResponsiveDrawerProps) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logoutUser() {
    Meteor.logout(err => {
      if(err) { console.error(err); return; }
      history.push('/');
    });
  }

  const store = useStateStore();
  const title = useTracker(() => store.title);

  const loggedIn = useTracker(() => Boolean(Meteor.user()));

  const drawer = (
    <div>
      <ToolbarPlaceholder />
      <Divider />
      <List dense>
        <ListItem button component={Link} to={"/questions"}>
          <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
          <ListItemText primary={"Questions"} />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        <ListItem button component={Link} to={"/ask"}>
          <ListItemIcon><CreateIcon /></ListItemIcon>
          <ListItemText primary={"Ask a question"} />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        <ListItem button component={Link} to={loggedIn ? "/profile" : "/login"}>
          {loggedIn ? (
            <>
              <ListItemIcon><ProfileIcon /></ListItemIcon>
              <ListItemText primary={"Profile"} />
            </>
          ) : (
            <>
              <ListItemIcon><LogInIcon /></ListItemIcon>
              <ListItemText primary={"Log In"} />
            </>
          )}
        </ListItem>
        {loggedIn && (
          <ListItem button onClick={() => logoutUser()}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar color="default" position="fixed" className={classes.appBar}>
        <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.appTitle}>
                { title }
            </Typography>
            <Grow />
            {/* <AccountButtons /> */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              root: classes.drawerRoot
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
              {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
