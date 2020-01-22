import * as React from 'react';
import { createStyles, Theme, WithStyles, Typography, withStyles, List, ListItem, ListItemText } from '@material-ui/core';
import StyledPaper from '../material-ui/StyledPaper';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';

const styles = (theme: Theme) => createStyles({
  root: {}
});

export interface SocialConnectionsProps extends WithStyles<typeof styles> {
  editable?: boolean;
}

class SocialConnectionsComponent extends React.Component<SocialConnectionsProps> {
  public render() {
    return (
      <StyledPaper>
        <Typography variant={"h6"} color={"textSecondary"}>
          Profiles
        </Typography>
        <List dense>
          <ListItem button={Boolean(this.props.editable)}>
            <ListItemText primary={
              this.props.editable ? "No Twitter account linked" : "Link Twitter account"
            } />
          </ListItem>
        </List>
      </StyledPaper>
    )
  }
}

export const SocialConnections = withStyles(styles)(autorun(SocialConnectionsComponent));