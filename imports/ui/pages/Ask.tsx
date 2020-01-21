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
import {RouterProps} from "react-router";
import SignupPrompt from "/imports/ui/components/SignupPrompt";

export type AskQuestionProps = WithSnackbarProps & RouterProps

class AskComponent extends React.Component<AskQuestionProps> {
  static contextType = StateStoreContext;

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
      Meteor.userId(),
      values.tagIds,
      (err: Meteor.Error, questionId: string) => {
        if(err) {
          enqueueSnackbar(err.error, { variant: "error" });
        } else {
          enqueueSnackbar("Question created!", { variant: "success" });
          form.setSubmitting(false);
          this.props.history.push(`/questions/${encodeURIComponent(questionId)}`)
        }
      }
    );
  };

  public render() {
    if(!Meteor.user()) {
      return <SignupPrompt />;
    }

    return(
      <Section>
        <StyledPaper elevation={0}>
          <AskForm submitHandler={(values: AskFormValues, form: FormikHelpers<AskFormValues>) => this.handleSubmit(values, form)} />
        </StyledPaper>
      </Section>
    );
  }
}

export const Ask = withSnackbar(autorun(AskComponent));
