import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import {Meteor} from "meteor/meteor";
import {Tags as TagsModel} from "/imports/api/models/tags";
import Grid from "/node_modules/@material-ui/core/Grid";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Typography from "/node_modules/@material-ui/core/Typography";
import Chip from "/node_modules/@material-ui/core/Chip";

type Props = {
  search:string
}

@autorun
export default class tagsTagSearchResults extends React.Component<Props> {
  render() {
    const { search } = this.props;
    Meteor.subscribe('tags.search', search, 36);

    // The publication is limiting it to 36 documents. We can't duplicate that on the frontend
    // because we're only operating on what's returned from the server. Eg, limit: 36, skip: 36 would only return 36
    // documents. So if you did limit: 36, skip: 36 on the client, you'd end up with no documents, because you skipped
    // all 36 of them that are in the client side db
    const tags = TagsModel.find({});
    return(
      <Grid container spacing={2}>
        {
          tags.map(t => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={t._id}>
              <StyledPaper>
                <Typography variant={"caption"}><Chip label={t.name} /> x {t.usages}</Typography>
                <Typography>
                  {t.description}
                </Typography>
                <Typography variant={"caption"}>0 asked today, 0 asked this week</Typography>
              </StyledPaper>
            </Grid>
          ))
        }
      </Grid>
    )
  }
}