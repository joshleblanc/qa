import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { schema as QuestionSchema } from '/imports/api/models/questions';
import {Field, Form, Formik, FormikHelpers} from "formik";
import { TextField } from 'formik-material-ui';
import { Meteor } from 'meteor/meteor';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import StyledButton from "/imports/ui/components/material-ui/StyledButton";
import {withSnackbar, WithSnackbarProps} from "notistack";
import { withStyles, WithStyles, Theme, createStyles, Typography } from '@material-ui/core';

type Values = {
  title: string,
  details: string
};

const styles = (theme: Theme) => createStyles({
  root: {},
  field: {
    margin: ".5rem 0"
  },
  title: {
    fontWeight: 700,
    marginBottom: "1rem"
  },
  buttons: {
    borderRadius: 4,
    textTransform: "capitalize",
    fontWeight: 300,
    letterSpacing: .3
  }
});

export interface AskQuestionProps extends WithSnackbarProps, WithStyles<typeof styles> {}

class AskComponent extends React.Component<AskQuestionProps> {
  public handleSubmit(values:Values, form:FormikHelpers<Values>) {
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
      <StyledPaper className={classes.root}>
        <Formik
            validationSchema={QuestionSchema}
            initialValues={{
              title: "",
              details: ""
            }}
            onSubmit={this.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Typography variant={"h4"} className={classes.title}>Ask a question</Typography>
              <Field
                name="title"
                label="Title"
                fullWidth
                variant="filled"
                component={TextField}
                className={classes.field}
              />
              <Field
                name="details"
                label="Details"
                fullWidth
                multiline
                variant="filled"
                component={TextField}
                className={classes.field}
                rows={4}
                rowsMax={10}
              />
              <StyledButton
                color="primary"
                variant="contained"
                size="large"
                type="submit"
                loading={isSubmitting}
                className={classes.buttons}
              >
                Submit
              </StyledButton>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    )
  }
}

export const Ask = withStyles(styles)(withSnackbar(autorun(AskComponent)));