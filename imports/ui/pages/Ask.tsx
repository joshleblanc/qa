import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {FormikHelpers} from "formik";
import { Meteor } from 'meteor/meteor';
import {withSnackbar, WithSnackbarProps} from "notistack";
import { AskFormValues, Form as AskForm } from '../components/question-ask/Form';
import {StateStoreContext} from "/imports/ui/stores/state-store";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Section from "/imports/ui/components/Section";
import { Redirect } from 'react-router';

export interface AskQuestionProps extends WithSnackbarProps {}

export interface AskQuestionState {
  redirectUri?: string;
}

class AskComponent extends React.Component<AskQuestionProps, AskQuestionState> {
  static contextType = StateStoreContext;
  public state: AskQuestionState = {
    redirectUri: undefined
  };

  componentDidMount() {
    this.context.title = "Ask a question";
  }

  public handleSubmit(values: AskFormValues, form: FormikHelpers<AskFormValues>) {
    const { enqueueSnackbar } = this.props;
    form.setSubmitting(true);
    Meteor.call(
      'questions.create',
      values.title,
      values.details,
      Meteor.user(),
      new Set(),
      (err: Meteor.Error, questionId: string) => {
        if(!err) {
          enqueueSnackbar("Question created!");
          form.setSubmitting(false);
          this.setState({ redirectUri: `/questions/${encodeURIComponent(questionId)}` });
        } else {
          enqueueSnackbar(err.error, { variant: "error" });
        }
      }
    );
  };

  public render() {
    return(
      <Section>
        {this.state.redirectUri && <Redirect to={this.state.redirectUri} />}
        <StyledPaper elevation={0}>
          <AskForm submitHandler={(values: AskFormValues, form: FormikHelpers<AskFormValues>) => this.handleSubmit(values, form)} />
        </StyledPaper>
      </Section>
    )
  }
}

export const Ask = withSnackbar(autorun(AskComponent));
