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
import {StateStoreContext} from "/imports/ui/stores/state-store";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Section from "/imports/ui/components/Section";
import { NoQuestions } from '../components/questions/NoQuestions';

class QuestionList extends React.Component {
  static contextType = StateStoreContext;

  componentDidMount() {
    this.context.title = "Recent Questions";
  }

  public render() {
    const loading = !Meteor.subscribe('questions').ready();

    if(loading) {
      return <LinearProgress />
    }

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
          <StyledPaper>
            <section>
              <List>
                {questions.map(q => (
                  <ListItem button component={Link} to={`/questions/${q._id}`} key={q._id}>
                    <ListItemText primary={q.title}/>
                  </ListItem>
                ))}
              </List>
            </section>
          </StyledPaper>
        )}
      </Section>
    );
  }
}

export const Questions = autorun(QuestionList);
