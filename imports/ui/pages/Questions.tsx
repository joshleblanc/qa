import React from 'react';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Meteor } from 'meteor/meteor';
import { Questions as QuestionsModel, Question } from '/imports/api/models/questions';
import { Link } from 'react-router-dom';
import {StateStoreContext} from "/imports/ui/stores/state-store";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Section from "/imports/ui/components/Section";
import { Theme, createStyles, withStyles, WithStyles, Typography } from '@material-ui/core';
import { NoQuestions } from '../components/questions/NoQuestions';

const styles = (theme: Theme) => createStyles({
  question: {
    margin: `${theme.spacing(1)}px 0`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2) + 4}px`
  },
  questionContent: {
    margin: `${theme.spacing(1)}px 0`
  }
});

export interface QuestionListProps extends WithStyles<typeof styles> {}

class QuestionList extends React.Component<QuestionListProps> {
  static contextType = StateStoreContext;

  public componentDidMount(): void {
    this.context.title = "Recent Questions";
  }

  private compareQuestions(a: Question, b: Question): number {
    return a.createdAt.getTime() - b.createdAt.getTime();
  }

  public render() {
    // const loading = !Meteor.subscribe('questions').ready();
    
    const { classes } = this.props;

    // if(loading) {
    //   return <LinearProgress />
    // }

    const questions = QuestionsModel.find({}, {
      sort: {
        createdAt: -1
      }
    });
    return(
      <Section>
        {questions.count() === 0 ? (
          <NoQuestions />
        ) : (
          questions.fetch().sort((a, b) => this.compareQuestions(a, b)).map((question: Question) => (
            <Link to={`/questions/${question._id}`}>
              <StyledPaper className={classes.question}>
                <Typography variant={"h5"}>{question.title}</Typography>
                <Typography variant={"body2"} className={classes.questionContent} color={"textSecondary"}>
                  {question.details.substr(0, 60)}
                </Typography>
                <Typography variant={"caption"} color={"textSecondary"}>
                  Asked by <b>{Meteor.users.find({ _id: question.userId }).fetch()[0]?.username}</b>{/*  */}
                  <br />
                  On {question.createdAt.toLocaleString()}
                </Typography>
              </StyledPaper>
            </Link>
          ))
        )}
      </Section>
    );
  }
}

export const Questions = autorun(QuestionList);
