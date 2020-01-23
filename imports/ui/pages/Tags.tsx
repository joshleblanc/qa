import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import Section from "/imports/ui/components/Section";
import StyledPaper from "/imports/ui/components/material-ui/StyledPaper";
import Grid from "/node_modules/@material-ui/core/Grid";
import {TextField} from "/node_modules/@material-ui/core";
import {ChangeEventHandler} from "/node_modules/@types/react";
import TagSearchResults from "/imports/ui/components/tags/TagSearchResults";

@autorun
export default class Tags extends React.Component {
  state = {
    search: ""
  };
  
  handleSearch:ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      search: e.target.value
    });
  };

  render() {
    const { search } = this.state;
    return(
      <Section>
        <StyledPaper>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label={"Search tags"} onChange={this.handleSearch} value={search}/>
            </Grid>
            <TagSearchResults search={search} />
          </Grid>
        </StyledPaper>
      </Section>
    )
  }
}