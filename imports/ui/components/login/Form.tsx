import { makeStyles } from "@material-ui/core";
import { Field, Form as FormikForm, Formik, FormikHelpers } from "formik";
import { UserSchema } from "/imports/api/models/user";
import StyledButton from "../material-ui/StyledButton";
import { TextField } from "formik-material-ui";
import * as React from "react";

const styles = makeStyles({
  fields: {
    width: "60%"
  }
});

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  submitHandler: (values: LoginFormValues, form: FormikHelpers<LoginFormValues>) => void;
  className?: string;
}

export const Form: React.FunctionComponent<LoginFormProps> = ({ submitHandler, className }: LoginFormProps): JSX.Element => {
  const classes = styles();

  return (
    <section className={className}>
      <Formik
        validationSchema={UserSchema}
        initialValues={{
          email: "",
          password: ""
        }}
        validateOnMount={true}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, isValid }) => (
          <FormikForm>
            <div className={classes.fields}>
              <Field
                name={"email"}
                label={"Email"}
                variant="outlined"
                fullWidth
                component={TextField}
                margin={"normal"}
              />
              <Field
                name={"password"}
                label={"Password"}
                variant="outlined"
                fullWidth
                component={TextField}
                type={"password"}
                margin={"normal"}
              />
              <StyledButton
                color={"primary"}
                variant={"contained"}
                type="submit"
                loading={isSubmitting}
                disabled={!isValid}
              >
                Login
              </StyledButton>
            </div>
          </FormikForm>
        )}
      </Formik>
    </section>
  );
}