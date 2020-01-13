import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Toolbar, ListItem, ListItemText, ListItemIcon, List, IconButton, Drawer, Divider, AppBar, Hidden } from "@material-ui/core";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ToolbarPlaceholder from "/imports/ui/components/ToolbarPlaceholder";
import { useStateStore } from '../stores/state-store';
import { useTracker } from 'meteor/react-meteor-data';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const store = useStateStore();
  const title = useTracker(() => store.title);

  const drawer = (
    <div>
      <ToolbarPlaceholder />
      <Divider />
      <List dense>
        <ListItem button component={Link} to={"/questions"}>
          <ListItemIcon><QuestionAnswerIcon/></ListItemIcon>
          <ListItemText primary={"Questions"} />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        <ListItem button component={Link} to={"/ask"}>
          <ListItemIcon><CreateIcon/></ListItemIcon>
          <ListItemText primary={"Ask a question"} />
        </ListItem>
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
            <Typography variant="h6" noWrap>
                { title }
            </Typography>
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
