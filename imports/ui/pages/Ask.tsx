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

export interface AskQuestionProps extends WithSnackbarProps {}

@autorun
class AskComponent extends React.Component<AskQuestionProps> {
  static contextType = StateStoreContext;

  componentDidMount() {
    this.context.title = "Ask a question";
  }

  public handleSubmit(values: AskFormValues, form: FormikHelpers<AskFormValues>) {
    const { enqueueSnackbar } = this.props;
    form.setSubmitting(true);
    Meteor.call('questions.create', values.title, values.details, (err: Meteor.Error) => {
      if(!err) {
        enqueueSnackbar("Question submitted!", { variant: "success" });
      } else {
        enqueueSnackbar(err.error, { variant: "error" });
      }
      form.setSubmitting(false);
    });
  };

  public render() {
    return(
      <Section>
        <StyledPaper elevation={0}>
          <AskForm submitHandler={(values: AskFormValues, form: FormikHelpers<AskFormValues>) => this.handleSubmit(values, form)} />
        </StyledPaper>
      </Section>
    )
  }
}

export const Ask = withSnackbar(AskComponent);
