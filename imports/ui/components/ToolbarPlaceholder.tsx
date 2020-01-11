import React from 'react';
import makeStyles from "/node_modules/@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));

export default () => {
    const classes = useStyles();
    return(
        <div className={classes.toolbar} />
    )
}