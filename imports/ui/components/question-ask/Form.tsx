import * as React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { schema as QuestionSchema } from '/imports/api/models/questions';
import {Field, Form as FormikForm, Formik, FormikHelpers} from "formik";
import {TextField} from "formik-material-ui";
import StyledButton from "/imports/ui/components/material-ui/StyledButton";
import { makeStyles } from "@material-ui/core";
import "react-mde/lib/styles/css/react-mde-all.css";

export interface AskFormValues {
  title: string,
  details: string
}

export interface FormProps {
  submitHandler: (values: AskFormValues, form: FormikHelpers<AskFormValues>) => void;
}

const styles = makeStyles({
  root: {},
  field: {
    margin: ".5rem 0",
  },
  titleField: {
    margin: ".5rem 0",
    maxWidth: "70%"
  },
  title: {
    marginBottom: ".5rem"
  },
  buttons: {
    borderRadius: 4,
    textTransform: "capitalize",
    fontWeight: 300,
    letterSpacing: .3
  }
});

export const Form: React.FunctionComponent<FormProps> = ({ submitHandler }): JSX.Element => {
  const classes = styles();

  return (
    <Formik
        validationSchema={QuestionSchema}
        initialValues={{
          title: "",
          details: ""
        }}
        onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <Field
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            component={TextField}
            className={classes.titleField}
          />
          <Field
            name="details"
            label="Details"
            fullWidth
            multiline
            variant="outlined"
            component={TextField}
            className={classes.field}
            rows={15}
            rowsMax={15}
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
        </FormikForm>
      )}
    </Formik>
  )
}