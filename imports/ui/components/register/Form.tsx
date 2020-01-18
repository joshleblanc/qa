import * as React from 'react';
import {Field, Form as FormikForm, Formik, FormikHelpers} from "formik";
import {TextField, Checkbox} from "formik-material-ui";
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import StyledButton from '../material-ui/StyledButton';
import yup from "yup";
import FormControlLabel from "/node_modules/@material-ui/core/FormControlLabel";
import FormHelperText from "/node_modules/@material-ui/core/FormHelperText";
import FormControl from "/node_modules/@material-ui/core/FormControl";

const styles = makeStyles((theme: Theme) => {
  return createStyles({
    fields: {
      width: "60%"
    },
    helperText: {
      marginTop: -theme.spacing(1)
    },
    checkbox: {
      marginBottom: theme.spacing(1)
    }
  })
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

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  confirmEmail: yup.string().required("Confirm email is a required field").email().oneOf([yup.ref('email')], "Emails must match"),
  password: yup.string().required("Password is a required field").min(6, "Password must be at least 6 characters"),
  termsAccept: yup.boolean().oneOf([true], "You must accept out terms and agreements")
});

export const Form: React.FunctionComponent<RegisterFormProps> = ({submitHandler, className}: RegisterFormProps): JSX.Element => {
  const classes = styles();

  return (
    <section className={className}>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          email: "",
          confirmEmail: "",
          password: "",
          termsAccept: false
        }}
        validateOnMount={true}
        onSubmit={submitHandler}
      >
        {({errors, isSubmitting, isValid}) => (
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
                name={"confirmEmail"}
                label={"Confirm Email"}
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
                margin={"normal"}
                component={TextField}
                type="password"
              />
            </div>
            <FormControl className={classes.checkbox}>
              <FormControlLabel
                control={
                  <Field label="Accept our Terms and Agreements" name="termsAccept" component={Checkbox}/>
                }
                label={"Accept our Terms and Agreements"}
              />
              <FormHelperText className={classes.helperText} error>{errors["termsAccept"]}</FormHelperText>
            </FormControl>

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