import React from 'react';
import Paper, {PaperProps} from '@material-ui/core/Paper';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}));


const StyledPaper:React.FunctionComponent<PaperProps> = ({children, ...props}) => {
    const classes = useStyles();
    return(
        <Paper classes={classes} {...props}>
            {children}
        </Paper>
    )
};

export default StyledPaper;
