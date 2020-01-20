import * as React from 'react';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "@material-ui/core/Typography";
import Section from "/imports/ui/components/Section";
import { Theme, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles((theme: Theme) => ({
  root: {
    height: `calc(100vh - 64px - ${ 2 * theme.spacing(2)}px)`
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr"
  },
  heroImage: {
    width: "100%",
    height: "auto"
  },
  caption: {
    textAlign: "right",
    width: "100%"
  }
}));

export default () => {
  const classes = styles();

  return(
    <Section>
      <StyledPaper className={classes.root}>
        <section className={classes.hero}>
          <div>
            <Typography variant={"h1"}>401</Typography>
            <Typography variant={"h2"}>Not Authorised</Typography>
            <Typography variant={"body1"}>
              It appears that you aren't logged in yet! Try <Link to={"/login"}>logging in</Link> if
              you have an account already.
              <br />
              If not, don't fret, you can <Link to={"/register"}>create an account</Link> right now
              and it only takes a minute or less.
            </Typography>
          </div>
          <div>
            <img src={"/resources/illustrations/access-denied_undraw.svg"} className={classes.heroImage} />
            <Typography component={"div"} className={classes.caption} variant={"caption"}>
              Illustration used from <a href={"https://undraw.co"} target={"__blank"}>undraw.co</a>
            </Typography>
          </div>
        </section>
      </StyledPaper>
    </Section>
  );
}