import * as React from 'react';
// @ts-ignore
import {autorun} from 'meteor/cereal:reactive-render';
import TextField from "@material-ui/core/TextField";
import {ChangeEvent, ChangeEventHandler} from "react";
import {Meteor} from 'meteor/meteor';
import TagSearchResults from "/imports/ui/components/question-ask/TagSearchResults";
import Popper from "@material-ui/core/Popper";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {searchTagsByName, Tags} from "/imports/api/models/tags";
import Chip from "@material-ui/core/Chip";
import {createStyles, Theme, WithStyles} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import {FieldProps} from "formik";

type State = {
  value: string,
}

const styles = (theme:Theme) => createStyles({
  adornment: {
    margin: theme.spacing(1),
    marginLeft: 0,
    display: 'flex'
  },
  chip: {
    marginRight: theme.spacing(1),
  }
});

type Props = WithStyles<typeof styles> & WithSnackbarProps & FieldProps;

@autorun
class TagSelect extends React.Component<Props> {
  private anchorEl: HTMLDivElement | null = null;
  private inputRef?: HTMLInputElement = undefined;
  public state: State = {
    value: ""
  };


  private handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value
    });
  };

  handleRef = (ref: HTMLDivElement) => {
    if (ref) {
      this.anchorEl = ref;
    }
  };

  addTag = (id:string) => {
    const { form, field } = this.props;
    this.setState({ value: "" });
    form.setFieldValue(field.name, [ ...form.values[field.name], id]);
    // Set focus back to the tag input element
    this.inputRef?.focus();
  };

  handleCreateTag = () => {
    const {value} = this.state;
    const {enqueueSnackbar} = this.props;
    Meteor.call("tags.quickCreate", value, (err: Meteor.Error, res: string) => {
      if (err) {
        enqueueSnackbar(err.message, {variant: "error"});
      } else {
        enqueueSnackbar("Tag Created");
        this.addTag(res);
      }
    });
  };

  handleAddTag = (id:string) => {
    this.addTag(id);
  };

  handleDelete = (id: string) => {
    const { form, field } = this.props;
    form.setFieldValue(field.name, form.values[field.name].filter((s: string) => s !== id));
  };

  get selected() {
    const { form, field } = this.props;
    return form.values[field.name];
  }

  private setInputRef(ref: HTMLInputElement) {
    this.inputRef = ref;
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    Meteor.subscribe('tags.byIds', this.selected);
    Meteor.subscribe('tags.search', value, 5);

    const tags = searchTagsByName(value);
    return (
      <>
        <div>
          <TextField
            ref={this.handleRef}
            fullWidth
            label="Tags"
            margin="dense"
            variant="outlined"
            value={value}
            inputRef={(ref) => this.setInputRef(ref)}
            InputProps={{
              startAdornment: <div className={classes.adornment}>
                {
                  this.selected.map((id: string) => {
                    const tag = Tags.findOne(id);
                    if (tag) {
                      return <Chip
                        key={id}
                        size={"small"}
                        label={tag.name}
                        onDelete={() => this.handleDelete(id)}
                        className={classes.chip}
                      />
                    } else {
                      return null;
                    }

                  })
                }
              </div>
            }}
            onChange={this.handleChange}
          />
        </div>
        <Popper
          open={value.length > 0}
          placement={"bottom-start"}
          anchorEl={this.anchorEl}
        >
          <TagSearchResults query={value} tags={tags} onCreateTag={this.handleCreateTag} onAddTag={this.handleAddTag}/>
        </Popper>
      </>
    )
  }
}

export default withStyles(styles)(withSnackbar(TagSelect))