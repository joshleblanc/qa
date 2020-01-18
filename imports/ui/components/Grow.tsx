import * as React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles(() => (
    createStyles({
        grow: {
            flexGrow: 1
        }
    })
));

const Grow:React.FunctionComponent = ({children}) => {
    const classes = useStyles();
    return(
        <div className={classes.grow}>{children}</div>
    )
};

export default Grow;