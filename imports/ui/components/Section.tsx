import * as React from 'react';
import makeStyles from "/node_modules/@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => (
    createStyles({
        section: {
            marginTop: theme.spacing(2)
        }
    })
));

const Section:React.FunctionComponent = ({children}) => {
    const classes = useStyles();
    return(
        <section className={classes.section}>
            {children}
        </section>
    )
};

export default Section;