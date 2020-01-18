import * as React from 'react';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "@material-ui/core/Typography";
import Section from "/imports/ui/components/Section";

export default () => {
  return(
    <Section>
        <StyledPaper>
            <Typography>Please login!</Typography>
        </StyledPaper>
    </Section>

  )
}