import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {Meteor} from "meteor/meteor";
import {Tags as TagsModel, Tag} from "/imports/api/models/tags";
import Grid from "/node_modules/@material-ui/core/Grid";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "/node_modules/@material-ui/core/Typography";
import Chip from "/node_modules/@material-ui/core/Chip";
import { WithStyles, Theme, createStyles, withStyles, IconButton, TextField } from '@material-ui/core';
import { mutateUser } from '/imports/api/methods/extended_user';
import EditIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/CloseTwoTone";

const styles = (theme: Theme) => createStyles({
  button: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    opacity: 1,
    transition: '100ms all ease',
  },
  root: {
    position: 'relative',
  },
  textField: {
    marginTop: 5
  }
});

export interface TagSearchResultsProps extends WithStyles<typeof styles> {
  search:string
}

export interface TagSearchResultsState {
  editingContext?: Tag;
}

class TagSearchResultsComponent extends React.Component<TagSearchResultsProps, TagSearchResultsState> {
  public state: TagSearchResultsState = {
    editingContext: undefined
  };

  private editTag(tag: Tag): void {
    this.setState({
      editingContext: tag
    });
  }

  private updateTagDescription_visual(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void {
    event.persist();

    this.setState((previousState: TagSearchResultsState) => {
      if(!previousState.editingContext) return {};

      return {
        editingContext: {
          description: event.target.value,
          name: previousState.editingContext.name,
          related: previousState.editingContext.related,
          usages: previousState.editingContext.usages,
          _id: previousState.editingContext._id
        }
      };
    });
  }

  public render() {
    const { search } = this.props;
    Meteor.subscribe('tags.search', search, 36);

    // The publication is limiting it to 36 documents. We can't duplicate that on the frontend
    // because we're only operating on what's returned from the server. Eg, limit: 36, skip: 36 would only return 36
    // documents. So if you did limit: 36, skip: 36 on the client, you'd end up with no documents, because you skipped
    // all 36 of them that are in the client side db

    const tags = TagsModel.find({});

    return(
      <Grid container spacing={2}>
        {
          tags.map((tag: Tag) => {
            if(this.state.editingContext?._id === tag._id) {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={tag._id}>
                  <StyledPaper className={this.props.classes.root}>
                    <IconButton size={"small"} className={this.props.classes.button}>
                      <CloseIcon />
                    </IconButton>
                    <Typography variant={"h6"}>Editing <Chip label={tag.name} /></Typography>
                    <TextField
                      variant={"standard"}
                      size={"small"}
                      label={"Tag Description"}
                      value={this.state.editingContext?.description}
                      onChange={(ev) => this.updateTagDescription_visual(ev)}
                      fullWidth
                      autoFocus
                      className={this.props.classes.textField}
                    />
                  </StyledPaper>
                </Grid>
              )
            }

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tag._id}>
                <StyledPaper className={this.props.classes.root}>
                  <Typography variant={"caption"}><Chip label={tag.name} /> x {tag.usages}</Typography>
                  <Typography variant={"body1"}>
                    {tag.description}
                    {mutateUser(Meteor.user()) && (
                      <>
                        <br />
                        <IconButton className={this.props.classes.button} size={"small"} onClick={() => this.editTag(tag)}>
                          <EditIcon />
                        </IconButton>
                      </>
                    )}
                  </Typography>
                  <Typography variant={"caption"}>0 asked today, 0 asked this week</Typography>
                </StyledPaper>
              </Grid>
            );
          })
        }
      </Grid>
    )
  }
}

export const TagSearchResults = withStyles(styles)(autorun(TagSearchResultsComponent));