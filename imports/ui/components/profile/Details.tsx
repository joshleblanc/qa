import * as React from 'react';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { Grid, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import StyledPaper from '../material-ui/StyledPaper';

const styles = (theme: Theme) => createStyles({
  root: {
    height: `calc(100vh - 64px - ${ 2 * theme.spacing(3)}px)`,
    marginLeft: theme.spacing(2)
  }
});

export interface DetailsProps extends WithStyles<typeof styles> {}

class DetailsComponent extends React.Component<DetailsProps> {
  public render() {
    const { classes } = this.props;
    return (
      <Grid xl={8} xs={8}>
        <StyledPaper className={classes.root}>
          Box
        </StyledPaper>
      </Grid>
    )
  }
}

export const Details = withStyles(styles)(autorun(DetailsComponent));