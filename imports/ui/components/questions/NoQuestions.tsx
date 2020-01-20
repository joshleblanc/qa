import * as React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
  noQuestionBanner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(5)
  },
  noQuestionIllustration: {
    height: '20vh',
    width: 'auto'
  }
}));

export const NoQuestions: React.FunctionComponent<{}> = ({}: {}): JSX.Element => {
  const classes = styles();

  return (
    <section className={classes.noQuestionBanner}>
      <img src={"/resources/illustrations/exploring_undraw.svg"} className={classes.noQuestionIllustration} />
      <Typography variant={"h2"} color={"textSecondary"}>
        No questions asked yet!
      </Typography>
    </section>
  );
}