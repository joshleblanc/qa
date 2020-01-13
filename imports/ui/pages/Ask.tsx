import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {FormikHelpers} from "formik";
import { Meteor } from 'meteor/meteor';
import {withSnackbar, WithSnackbarProps} from "notistack";
import { withStyles, WithStyles, Theme, createStyles, Paper } from '@material-ui/core';
import { AskFormValues, Form as AskForm } from '../components/question-ask/Form';
import {StateStoreContext} from "/imports/ui/stores/state-store";

const styles = (theme: Theme) => createStyles({
  formContainer: {
    background: "transparent",
  },
  root: {
    display: "grid",
    gridTemplateColumns: "7fr 3fr",
    marginTop: theme.spacing(2)
  }
});

export interface AskQuestionProps extends WithSnackbarProps, WithStyles<typeof styles> {}

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
    const { classes } = this.props;

    return(
      <section className={classes.root}>
        <Paper elevation={0} className={classes.formContainer}>
          <AskForm submitHandler={(values: AskFormValues, form: FormikHelpers<AskFormValues>) => this.handleSubmit(values, form)} />
        </Paper>
      </section>
    )
  }
}

export const Ask = withStyles(styles)(withSnackbar(autorun(AskComponent)));
