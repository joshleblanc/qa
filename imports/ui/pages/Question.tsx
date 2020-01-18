import React from 'react';
//@ts-ignore
import {autorun} from 'meteor/cereal:reactive-render';
import LinearProgress from "@material-ui/core/LinearProgress";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import {Questions} from "/imports/api/models/questions";
import Typography from "@material-ui/core/Typography";
import {Meteor} from 'meteor/meteor';
import {StateStoreContext} from "/imports/ui/stores/state-store";
import Section from "/imports/ui/components/Section";
import {WithStyles, createStyles, withStyles} from '@material-ui/core';
import {Tag, Tags} from "/imports/api/models/tags";
import Chip from "/node_modules/@material-ui/core/Chip";

const styles = () => createStyles({
  root: {
    minHeight: "40vh"
  }
});

export interface QuestionProps extends WithStyles<typeof styles> {
  match: {
    params: {
      id: string
    }
  }
}


class QuestionComponent extends React.Component<QuestionProps> {
  static contextType = StateStoreContext;

  public render() {
    const {match: {params: {id}}} = this.props;
    const loading = !Meteor.subscribe('question', id).ready();
    if (loading) {
      this.context.title = "Loading...";
      return <LinearProgress/>
    }

    const question = Questions.findOne({_id: id});
    let tags = [];
    if(question.tagIds) {
      tags = Tags.find({_id: {$in: question.tagIds}});
    }

    if (!question) {
      this.context.title = "Oopsie whoopsie";
      return (
        <StyledPaper>
          <Typography variant={"h5"}>Question not found!</Typography>
        </StyledPaper>
      );
    }
    this.context.title = `Question: ${question.title}`;

    const {classes} = this.props;

    return (
      <Section>
        <StyledPaper className={classes.root}>
          <Typography variant={"body2"}>
            {question.details}
          </Typography>
          {
            tags.map((t: Tag) => {
              return <Chip
                key={t._id}
                label={t.name}
              />;
            })
          }
        </StyledPaper>
      </Section>
    );
  }
}

export const Question = withStyles(styles)(autorun(QuestionComponent));
