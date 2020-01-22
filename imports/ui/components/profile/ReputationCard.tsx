import * as React from 'react';
import StyledPaper from '../material-ui/StyledPaper';
import { Typography, makeStyles, Grid, Chip, Avatar } from '@material-ui/core';

const styles = makeStyles(theme => ({
  points: {
    marginTop: 0
  },
  marginBottom: {
    marginBottom: theme.spacing(1)
  },
  achievementChip: {
    margin: `0 ${theme.spacing(1)}px`
  }
}));

export const ReputatonCard: React.FunctionComponent<{}> = ({}: {}): JSX.Element => {
  const classes = styles();

  return (
    <StyledPaper>
      <Typography variant={"h6"} color={"textSecondary"}>Internet Points</Typography>
      <Typography className={classes.points} variant={"h2"}>
        1337
      </Typography>
      <Typography variant={"h6"} color={"textSecondary"} className={classes.marginBottom}>
        Achievements
      </Typography>
      <Grid container>
        <Chip
          avatar={(
            <Avatar color={"primary"}>L</Avatar>
          )}
          variant={"outlined"}
          label={"The lit ones"}
          className={classes.achievementChip}
        />
        <Chip
          avatar={(
            <Avatar color={"primary"}>L</Avatar>
          )}
          variant={"outlined"}
          label={"The lit ones"}
          className={classes.achievementChip}
        />
        <Chip
          avatar={(
            <Avatar color={"primary"}>L</Avatar>
          )}
          variant={"outlined"}
          label={"The lit ones"}
          className={classes.achievementChip}
        />
        <Chip
          avatar={(
            <Avatar color={"primary"}>L</Avatar>
          )}
          variant={"outlined"}
          label={"The lit ones"}
          className={classes.achievementChip}
        />
      </Grid>
    </StyledPaper>
  )
}