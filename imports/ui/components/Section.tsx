import * as React from 'react';
import makeStyles from "/node_modules/@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => (
  createStyles({
    section: {
      marginTop: theme.spacing(4)
    }
  })
));

export interface SectionProps {
  className?: string;
  children: any;
}

const Section:React.FunctionComponent<SectionProps> = ({ children, className }: SectionProps) => {
  const classes = useStyles();

  return(
    <section className={`${classes.section} ${className}`}>
      {children}
    </section>
  )
};

export default Section;