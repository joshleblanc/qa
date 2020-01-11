import React from 'react';
import Button, {ButtonProps} from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import green from '@material-ui/core/colors/green';
import CircularProgress from "/node_modules/@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

export type StyledButtonProps = {
    loading?: boolean
} & ButtonProps

const StyledButton:React.FunctionComponent<StyledButtonProps> = ({loading, children, ...props}) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    {...props}
                >
                    {children}
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    )
};

export default StyledButton;