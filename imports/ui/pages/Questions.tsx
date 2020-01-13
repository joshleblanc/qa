import React from 'react';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import LinearProgress from "@material-ui/core/LinearProgress";
import { Meteor } from 'meteor/meteor';
import { Questions as QuestionsModel } from '/imports/api/models/questions';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Link } from 'react-router-dom';
import { Typography, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing(2)
  }
});

export interface QuestionListProps extends WithStyles<typeof styles> {}

class QuestionList extends React.Component<QuestionListProps> {
  public render() {
    const loading = !Meteor.subscribe('questions').ready();
    
    if(loading) {
      return <LinearProgress />
    }

    const questions = QuestionsModel.find({});
    const { classes } = this.props;

    return(
      <section className={classes.root}>
        <section>
          <Typography variant="h4">
            Recent Questions
          </Typography>
          <List>
            {
              questions.map(q => (
                <ListItem button component={Link} to={`/questions/${q._id}`} key={q._id}>
                  <ListItemText primary={q.title}/>
                </ListItem>
              ))
            }
          </List>
        </section>
      </section>
    );
  }
}

export const Questions = withStyles(styles)(autorun(QuestionList));