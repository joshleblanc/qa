import React from 'react';
//@ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import LinearProgress from "@material-ui/core/LinearProgress";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import {Questions} from "/imports/api/models/questions";
import Typography from "@material-ui/core/Typography";
import { Meteor } from 'meteor/meteor';

type Props = {
  match: {
    params: {
      id: string
    }
  }
}

@autorun
export default class Question extends React.Component<Props> {
  public render() {
    const { match: { params: { id } } } = this.props;
    const loading = !Meteor.subscribe('question', id).ready();
    if(loading) {
      return <LinearProgress />
    }
    
    const question = Questions.findOne({ _id: id });

    if(!question) {
      return(
        <StyledPaper>
          <Typography variant={"h5"}>Question not found!</Typography>
        </StyledPaper>
      );
    }

    return(
      <StyledPaper>
          <Typography variant={"h5"}>{question.title}</Typography>
      </StyledPaper>
    );
  }
}
