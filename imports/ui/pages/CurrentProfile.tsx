import * as React from 'react';
import Section from '../components/Section';
import { RouteProps } from 'react-router';
import { Meteor } from 'meteor/meteor';
import SignupPrompt from '../components/SignupPrompt';
import { UserCard } from '../components/profile/UserCard';
import { WithStyles, createStyles, Theme, withStyles, Grid } from '@material-ui/core';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { Details } from '../components/profile/Details';
import {StateStoreContext} from "/imports/ui/stores/state-store";
import { ReputatonCard } from '../components/profile/ReputationCard';
import { SocialConnections } from '../components/profile/SocialConnections';

const styles = (theme: Theme) => createStyles({
  root: {
  }
});

export interface CurrentProfileProps extends RouteProps, WithStyles<typeof styles> {}

class CurrentProfileComponent extends React.Component<CurrentProfileProps> {
  static contextType = StateStoreContext;

  public componentDidMount(): void {
    this.context.title = "Your Profile";
  }

  public render() {
    if(!Meteor.userId()) {
      return <SignupPrompt />;
    }
    const { classes } = this.props;
    
    return (
      <Section className={classes.root}>
        <Grid container justify={"center"} spacing={2}>
          <Grid xl={4} xs={12}>
            <UserCard editable />
            <br />
            <ReputatonCard />
            <br />
            <SocialConnections />
          </Grid>
          <Grid xl={8} xs={12}>
            <Details />
          </Grid>
        </Grid>
      </Section>
    );
  }
}

export const CurrentProfile = withStyles(styles)(autorun(CurrentProfileComponent));