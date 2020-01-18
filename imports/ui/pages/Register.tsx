import * as React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import {WithSnackbarProps, withSnackbar} from "notistack";
import {StateStoreContext} from "/imports/ui/stores/state-store";
import Typography from "@material-ui/core/Typography";
import { Form as RegisterForm, RegisterFormValues } from "../components/register/Form";
import { Accounts } from 'meteor/accounts-base';
import { FormikHelpers } from 'formik';

const styles = (theme: Theme) => createStyles({
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
    clipPath: "polygon(99% 0%, 0px 0px, 0px 51%, 0px 100%, 35.22% 83.82%, 56.40% 74.42%, 63.22% 53.8%, 84.39% 43.69%, 88.04% 24%, 98.47% 19.21%)",
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

export interface RegisterProps extends WithSnackbarProps, WithStyles<typeof styles> {}

@autorun
class RegisterComponent extends React.Component<RegisterProps> {
  static contextType = StateStoreContext;

  public componentDidMount(): void {
    this.context.removeOtherElements = true;
    document.body.style.overflow = "hidden";
  }
  
  public componentWillUnmount(): void {
    this.context.removeOtherElements = false;
    document.body.style.overflow = "auto";
  }

  private createUser(values: RegisterFormValues, form: FormikHelpers<RegisterFormValues>) {
    const { enqueueSnackbar } = this.props;
    if(values.email !== values.confirmEmail) {
      form.setSubmitting(false);
      enqueueSnackbar(<span>Emails do not match!</span>, { variant: "error" });
      return;
    }
    if(values.password.length < 6) {
      form.setSubmitting(false);
      enqueueSnackbar(<span>Sorry, your password isn't 6 letters yet!</span>, { variant: "error" });
      return;
    }
    if(!values.termsAccept) {
      form.setSubmitting(false);
      enqueueSnackbar(<span>You have to accept out terms and agreements before proceeding!</span>, { variant: "error" });
      return;
    }
    
    Accounts.createUser({
      email: values.email,
      password: values.password
    }, err => {
      if(err) {
        form.setSubmitting(false);
        enqueueSnackbar(<span>Error while signing up: ${err.message}</span>, { variant: "error" });
        return;
      }
      enqueueSnackbar(<span>Signed up!</span>, { variant: "success" });
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

export const Register = withStyles(styles)(withSnackbar(RegisterComponent));