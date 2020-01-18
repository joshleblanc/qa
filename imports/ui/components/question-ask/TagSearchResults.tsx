import * as React from 'react';
import {Tag} from "/imports/api/models/tags";
import { Mongo } from 'meteor/mongo';
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "@material-ui/core/Typography";
import StyledButton from "/imports/ui/components/material-ui/StyledButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {MouseEventHandler} from "react";

type Props = {
  tags: Mongo.Cursor<Tag>,
  query: string,
  onCreateTag: MouseEventHandler,
  onAddTag: Function
}

const useStyles = makeStyles((theme:Theme) => {
  return createStyles({
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      margin: theme.spacing(1)
    }
  });
});

const Container:React.FunctionComponent = ({children}) => {
  const classes = useStyles();
  return <StyledPaper elevation={8} className={classes.container}>{children}</StyledPaper>;
};

const TagSearchResults:React.FunctionComponent<Props> = ({tags, query, onCreateTag, onAddTag}) => {
  const classes = useStyles();
  if(tags.count() === 0) {
    return(
      <Container>
        <Typography>No Tags Found</Typography>
        <StyledButton
          className={classes.button}
          variant={"outlined"}
          onClick={onCreateTag}
        >
          Create {query}
        </StyledButton>
      </Container>
    )
  }
  return(
    <Container>
      {
        tags.map(t => {
          return(
            <StyledButton key={t._id} className={classes.button} variant={"outlined"} onClick={() => onAddTag(t._id)}>
              {t.name}
            </StyledButton>
          )
        })
      }
    </Container>

  )
};

export default TagSearchResults;