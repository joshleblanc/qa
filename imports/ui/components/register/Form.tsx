import * as React from 'react';
import {Field, Form as FormikForm, Formik, FormikHelpers} from "formik";
import {UserSchema} from "/imports/api/models/user";
import {TextField, CheckboxWithLabel} from "formik-material-ui";
import { makeStyles } from '@material-ui/core';
import StyledButton from '../material-ui/StyledButton';

const styles = makeStyles({
  field: {
    width: "60%"
  }
});

export interface RegisterFormValues {
  email: string;
  confirmEmail: string;
  password: string;
  termsAccept: boolean;
}

export interface RegisterFormProps {
  submitHandler: (values: RegisterFormValues, form: FormikHelpers<RegisterFormValues>) => void;
  className?: string;
}

export const Form: React.FunctionComponent<RegisterFormProps> = ({ submitHandler, className }: RegisterFormProps): JSX.Element => {
  const classes = styles();

  return (
    <section className={className}>
      <Formik
        validationSchema={UserSchema}
        initialValues={{
          email: "",
          confirmEmail: "",
          password: "",
          termsAccept: false
        }}
        validateOnMount={true}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, isValid }) => (
          <FormikForm>
            <Field
              name={"email"}
              label={"Email"}
              variant="outlined"
              fullWidth
              className={classes.field}
              component={TextField}
              margin={"normal"}
            />
            <Field
              name={"confirmEmail"}
              label={"Confirm Email"}
              variant="outlined"
              fullWidth
              className={classes.field}
              component={TextField}
              margin={"normal"}
            />
            <Field
              name={"password"}
              label={"Password"}
              variant="outlined"
              fullWidth
              margin={"normal"}
              className={classes.field}
              component={TextField}
              type="password"
            />
            <br />
            <Field
              name={"acceptTerms"}
              Label={{ label: "Accept our Terms and Agreements" }}
              component={CheckboxWithLabel}
            />
            <br />
            <StyledButton
              color={"primary"}
              variant={"contained"}
              type="submit"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Register
            </StyledButton>
          </FormikForm>
        )}
      </Formik>
    </section>
  )
};