import React from 'react';
// @ts-ignore
import { autorun } from 'meteor/cereal:reactive-render';
import Section from "/imports/ui/components/Section";
import Grid from "/node_modules/@material-ui/core/Grid";
import {TextField} from "/node_modules/@material-ui/core";
import {ChangeEventHandler} from "/node_modules/@types/react";
import { TagSearchResults } from "/imports/ui/components/tags/TagSearchResults";

@autorun
export default class Tags extends React.Component {
  public state = {
    search: ""
  };
  
  private handleSearch: ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      search: e.target.value
    });
  };

  public render() {
    const { search } = this.state;
    return(
      <Section>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label={"Search tags"} onChange={this.handleSearch} value={search} margin={"normal"} variant={"filled"}/>
          </Grid>
          <TagSearchResults search={search} />
        </Grid>
      </Section>
    )
  }
}