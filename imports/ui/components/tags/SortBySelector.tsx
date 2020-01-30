import * as React from 'react';
import { Button } from '@material-ui/core';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export enum SortBy {
  'Name',
  'Date Added',
  'Usages'
}

export interface OnSelectFunc {
  (i: SortBy): void
}

export interface SortBySelectorProps {
  currentSortBy: SortBy,
  onSelect: OnSelectFunc
}

export const SortBySelector: React.FunctionComponent<SortBySelectorProps> = ({ currentSortBy, onSelect }: SortBySelectorProps): JSX.Element | null => {
  const [open, setOpen] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setOpen(!open);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = React.useCallback((sortBy:SortBy) => {
    onSelect(sortBy);
    setOpen(false);
  }, []);

  // how to typescript refs
  const ref = React.useRef<HTMLButtonElement>(null);
  if(!ref) return null;
  return (
    <>
      <Button onClick={handleClick} ref={ref}>Sort By: {SortBy[currentSortBy]}</Button>
      <Menu keepMounted open={open} onClose={handleClose} anchorEl={ref.current}>
        <MenuItem onClick={() => handleSelect(SortBy.Usages)}>Usages</MenuItem>
        <MenuItem onClick={() => handleSelect(SortBy.Name)}>Name</MenuItem>
        <MenuItem onClick={() => handleSelect(SortBy["Date Added"])}>Date Added</MenuItem>
      </Menu>
    </>
  );
};