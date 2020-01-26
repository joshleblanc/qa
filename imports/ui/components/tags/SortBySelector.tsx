import * as React from 'react';
import { Button } from '@material-ui/core';

export enum SortBy {
  'Name',
  'DateAdded'
}

export interface SortBySelectorProps {
  currentSortBy: SortBy
}

export const SortBySelector: React.FunctionComponent<SortBySelectorProps> = ({ currentSortBy }: SortBySelectorProps): JSX.Element => {
  return (
    <section>
      <Button>Sort By: Name</Button>
    </section>
  );
}