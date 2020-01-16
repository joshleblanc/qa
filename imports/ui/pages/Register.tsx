import * as React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import {WithSnackbarProps} from "/node_modules/notistack";

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(2)
  },
});

export interface RegisterProps extends WithSnackbarProps, WithStyles<typeof styles> {}

class RegisterComponent extends React.Component<RegisterProps> {
  public render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        //
      </section>
    )
  }
}

export const Register = withStyles(styles)(autorun(RegisterComponent));