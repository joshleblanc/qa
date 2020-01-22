import * as React from 'react';
import { Grid, makeStyles, Avatar, Typography, Button } from '@material-ui/core';
import StyledPaper from '../material-ui/StyledPaper';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Skeleton } from '@material-ui/lab';

const styles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  username: {
    fontWeight: 700
  }
}));

function descriptionRender(user: Meteor.User): JSX.Element {
  if(!user.profile?.description) {
    return (
      <>
        <Typography variant={"body2"} color={"textSecondary"}>
          No description set yet for your profile.
          <Button variant={"text"} size={"small"} color={"secondary"}>Write one now!</Button>
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant={"body2"} color={"textSecondary"}>
        {user.profile?.description}
        <br />
        <Button variant={"text"} size={"small"}>Edit</Button>
      </Typography>
    </>
  );
}

export const UserCard: React.FunctionComponent<{}> = ({}: {}): JSX.Element|null => {
  const classes = styles();
  const user = useTracker(() =>  Meteor.user());

  if(!user) return (
    <Skeleton variant={"rect"} height={70} width={"100%"} />
  );

  return (
    <>
      <StyledPaper>
        <Grid container spacing={2}>
          <Grid xl={2} xs={2}>
            <Avatar className={classes.avatar} variant={"circle"} color={"primary"} src={"/resources/illustrations/avatar-male_undraw.svg"} />
          </Grid>
          <Grid xl={10} xs={10}>
            <section>
              <Typography color={"textSecondary"} className={classes.username} variant={"h5"}>
                {user.username}
              </Typography>
              {descriptionRender(user)}
            </section>
          </Grid>
        </Grid>
      </StyledPaper>
    </>
  );
};