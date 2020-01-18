import * as React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { schema as QuestionSchema } from '/imports/api/models/questions';
import {Field, Form as FormikForm, Formik, FormikHelpers} from "formik";
import {TextField} from "formik-material-ui";
import StyledButton from "/imports/ui/components/material-ui/StyledButton";
import { makeStyles } from "@material-ui/core";
import "react-mde/lib/styles/css/react-mde-all.css";
import TagSelect from "/imports/ui/components/question-ask/TagSelect";

export interface AskFormValues {
  title: string,
  details: string
}

export interface FormProps {
  submitHandler: (values: AskFormValues, form: FormikHelpers<AskFormValues>) => void;
}

const styles = makeStyles({
  root: {},
  titleField: {
    maxWidth: "70%"
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
            margin="normal"
            variant="outlined"
            component={TextField}
            className={classes.titleField}
          />
          <Field
            name="details"
            label="Details"
            fullWidth
            multiline
            margin="dense"
            variant="outlined"
            component={TextField}
            rows={15}
            rowsMax={15}
          />
          <Field name="tags" component={TagSelect} />
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