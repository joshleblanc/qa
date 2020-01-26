import * as React from 'react';
import { makeStyles, Avatar, Typography, Button } from '@material-ui/core';
import StyledPaper from '../material-ui/StyledPaper';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Skeleton } from '@material-ui/lab';

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  username: {
    fontWeight: 700
  },
  content: {
    marginLeft: theme.spacing(2)
  }
}));

function descriptionRender(user: Meteor.User, editable?: boolean): JSX.Element {
  if(!user.profile?.description) {
    return (
      <>
        <Typography variant={"body2"} color={"textSecondary"}>
          No description set yet.
          {editable && (
            <Button variant={"text"} size={"small"} color={"secondary"}>Write one now!</Button>
          )}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography variant={"body2"} color={"textSecondary"}>
        {user.profile?.description}
        {editable && (
          <>
            <br />
            <Button variant={"text"} size={"small"}>Edit</Button>
          </>
        )}
      </Typography>
    </>
  );
}

export interface UserCardProps {
  user?: Meteor.User|null;
  editable?: boolean;
}

export const UserCard: React.FunctionComponent<UserCardProps> = ({ user, editable }: UserCardProps): JSX.Element|null => {
  const classes = styles();
  const computationUser = useTracker(() =>  user || Meteor.user());

  if(!computationUser) return (
    <Skeleton variant={"rect"} height={70} width={"100%"} />
  );

  return (
    <>
      <StyledPaper className={classes.root}>
          <Avatar className={classes.avatar} variant={"circle"} color={"primary"} src={"/resources/illustrations/avatar-male_undraw.svg"} />
          <section className={classes.content}>
            <Typography color={"textSecondary"} className={classes.username} variant={"h5"}>
              {computationUser.username}
            </Typography>
            {descriptionRender(computationUser, editable)}
          </section>
      </StyledPaper>
    </>
  );
};