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
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {createStyles, Theme} from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import {FieldProps} from "formik";

type State = {
  value: string,
}

const styles = createStyles((theme:Theme) => ({
  adornment: {
    margin: theme.spacing(1),
    marginLeft: 0,
    display: 'flex'
  },
  chip: {
    marginRight: theme.spacing(1),
  }
}));

type Props = {
  classes: {
    adornment: string,
    chip: string
  }
} & WithSnackbarProps & FieldProps;

@autorun
class TagSelect extends React.Component<Props> {
  anchorEl: HTMLDivElement | null = null;
  state: State = {
    value: ""
  };

  handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  handleCreateTag = () => {
    const {value} = this.state;
    const {enqueueSnackbar} = this.props;
    Meteor.call("tags.quickCreate", value, (err: Meteor.Error, res: string) => {
      if (err) {
        enqueueSnackbar(err.message, {variant: "error"});
      } else {
        enqueueSnackbar("Tag Created", {variant: "success"});
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

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    Meteor.subscribe('tags.byIds', this.selected);
    Meteor.subscribe('tags.search', value);

    const tags = searchTagsByName(value);
    return (
      <>
        <Typography variant={"h5"}>Tags</Typography>
        <div>
          <TextField
            ref={this.handleRef}
            fullWidth
            label="Tags"
            margin="dense"
            variant="outlined"
            value={value}
            InputProps={{
              startAdornment: <div className={classes.adornment}>
                {
                  this.selected.map((id: string) => {
                    const tag = Tags.findOne(id);
                    if (tag) {
                      return <Chip
                        key={id}
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

export default withSnackbar(withStyles(styles)(TagSelect)))