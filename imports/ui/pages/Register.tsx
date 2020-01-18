import * as React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import {WithSnackbarProps, withSnackbar} from "notistack";
import Typography from "@material-ui/core/Typography";
import { Form as RegisterForm, RegisterFormValues } from "../components/register/Form";
import { Accounts } from 'meteor/accounts-base';
import { FormikHelpers } from 'formik';
import { AUTH_CLIP_PATH_STYLE } from '../stores/constants';
import {RouterProps} from 'react-router';

export const authenticationStyles = (theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: "url('/resources/background-colored.jpg')",
    backgroundSize: "cover",
    // filter: "sepia(.64)",
    overflow: "hidden"
  },
  container: {
    clipPath: AUTH_CLIP_PATH_STYLE,
    background: theme.palette.type === "light" ? "rgba(255,255,255,.6)" : "rgba(0,0,0,.6)",
    top: 0,
    left: 0,
    height: "100vh",
    width: "40vw",
    padding: theme.spacing(2),
    position: "absolute",
    color: theme.palette.type === "light" ? "#EDEDED" : theme.palette.text.primary
  },
  form: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(3)
  }
});

export interface RegisterProps extends WithSnackbarProps, WithStyles<typeof authenticationStyles>, RouterProps {}

@autorun
class RegisterComponent extends React.Component<RegisterProps> {

  public componentDidMount(): void {
    document.body.style.overflow = "hidden";
  }
  
  public componentWillUnmount(): void {
    document.body.style.overflow = "auto";
  }

  private createUser(values: RegisterFormValues, form: FormikHelpers<RegisterFormValues>): void {
    const { enqueueSnackbar } = this.props;
    if(values.email !== values.confirmEmail) {
      form.setSubmitting(false);
      enqueueSnackbar("Emails do not match!", { variant: "error" });
      return;
    }

    if(!values.termsAccept) {
      form.setSubmitting(false);
      enqueueSnackbar("You have to accept out terms and agreements before proceeding!", { variant: "error" });
      return;
    }
    
    Accounts.createUser({
      email: values.email,
      password: values.password,
      username: `User #${+Math.random().toFixed(5) * 100000}`
    }, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(`Error while signing up: ${err.message}`, { variant: "error" });
        return;
      }
      enqueueSnackbar("Signed up!", { variant: "success" });
      this.props.history.push("/");
    });
  }

  public render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <section className={classes.container}>
          <Typography variant={"h2"}>Register</Typography>
          <Typography variant={"h6"}>Join the community!</Typography>
          <RegisterForm
            submitHandler={(values: RegisterFormValues, form: FormikHelpers<RegisterFormValues>) => this.createUser(values, form)}
            className={classes.form}
          />
        </section>
      </section>
    )
  }
}

export const Register = withStyles(authenticationStyles)(withSnackbar(autorun(RegisterComponent)));