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
import EditIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/CloseTwoTone";
import { isAdmin } from '/imports/api/methods/extended_user';
import {SortBy} from "/imports/ui/components/tags/SortBySelector";

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
  },
  tagDesc: {
    margin: '5px 0',
    height: theme.spacing(8),
    overflow: 'hidden'
  },
  usage: {
    paddingLeft: theme.spacing(1)
  }
});

export interface TagSearchResultsProps extends WithStyles<typeof styles> {
  search: string,
  sort: SortBy
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

  static formatDescription(description: string): string {
    if(description.length === 0) return "No description set yet.";

    return description;
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

  private checkForSubmission(ev: React.KeyboardEvent<HTMLDivElement>): void {
    ev.persist();

    if(ev.keyCode === 13) {
      // Enter key is pressed
      if(!this.state.editingContext) return;
      ev.preventDefault();

      const updatedTag: Tag = this.state.editingContext;

      // *shrug* smh typescript
      if(!updatedTag._id) return;

      TagsModel.update(updatedTag._id, {
        $set: {
          description: updatedTag.description,
          name: updatedTag.name,
          related: updatedTag.related,
          usages: updatedTag.usages
        }
      }, {}, () => this.setState({ editingContext: undefined }));
    }
  }

  private editingView(tag: Tag): React.ReactNode {
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
            multiline
            rows={3}
            className={this.props.classes.textField}
            onKeyDown={(ev) => this.checkForSubmission(ev)}
          />
        </StyledPaper>
      </Grid>
    );
  }

  public render() {
    const { search, sort } = this.props;
    Meteor.subscribe('tags.search', search, sort, 16);

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
              return this.editingView(tag);
            }

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tag._id}>
                <StyledPaper className={this.props.classes.root}>
                  {isAdmin(Meteor.user()) && (
                    <IconButton className={this.props.classes.button} size={"small"} onClick={() => this.editTag(tag)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <Typography variant={"caption"} color={"textSecondary"}>
                    <Chip label={tag.name} />
                    <span className={this.props.classes.usage}>
                      x {tag.usages}
                    </span>
                  </Typography>
                  <Typography variant={"body2"} className={this.props.classes.tagDesc}>
                    {TagSearchResultsComponent.formatDescription(tag.description)}
                  </Typography>
                  <Typography color={"textSecondary"} variant={"caption"}>0 asked today, 0 asked this week</Typography>
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