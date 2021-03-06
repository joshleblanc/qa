import * as React from 'react';
import { WithStyles, withStyles, Typography } from '@material-ui/core';
import { WithSnackbarProps, withSnackbar } from 'notistack';
import {StateStoreContext} from "/imports/ui/stores/state-store";
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import { authenticationStyles } from './Register';
import { Form as LoginForm, LoginFormValues } from '../components/login/Form';
import { FormikHelpers } from 'formik';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export interface LoginProps extends WithSnackbarProps, WithStyles<typeof authenticationStyles> {}

export interface LoginState {
  redirectToHome: boolean;
}

class LoginComponent extends React.Component<LoginProps, LoginState> {
  public state: LoginState = {
    redirectToHome: false
  };

  static contextType = StateStoreContext;

  public componentDidMount(): void {
    document.body.style.overflow = "hidden";
  }
  
  public componentWillUnmount(): void {
    document.body.style.overflow = "auto";
  }

  private loginUser(values: LoginFormValues, form: FormikHelpers<LoginFormValues>): void {
    const { enqueueSnackbar } = this.props;

    Meteor.loginWithPassword(values.email, values.password, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(`Failed to login: ${err.message}`, { variant: "error" });
        return;
      }

      enqueueSnackbar("Logged in successfully!");
      this.setState({ redirectToHome: true });
    });
  }

  public render() {
    const { classes } = this.props;

    return (
      <section className={classes.root}>
        {this.state.redirectToHome && <Redirect to={"/"} />}
        <section className={classes.container}>
          <Typography variant={"h2"}>Log In</Typography>
          <Typography variant={"h6"}>To your account!</Typography>
          <LoginForm submitHandler={(values: LoginFormValues, form: FormikHelpers<LoginFormValues>) => this.loginUser(values, form)} className={classes.form} />
          <Typography variant={"body1"} className={classes.altMethod}>
            Don't have an account yet? <Link to={"/register"}>Create one</Link> now!
          </Typography>
        </section>
      </section>
    )
  }
}

export const Login = withStyles(authenticationStyles)(withSnackbar(autorun(LoginComponent)));