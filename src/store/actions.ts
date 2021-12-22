import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({payload: guitars}),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({payload: guitar}),
);

export const displayGuitars = createAction(
  ActionType.DisplayGuitars,
  (guitars: Guitar[]) => ({payload: guitars}),
);

export const sortGuitars = createAction(
  ActionType.SortGuitars,
  (sortMethod: string) => ({payload: sortMethod}),
);

export const filterGuitars = createAction(
  ActionType.FilterGuitars,
  (filterMethod: string) => ({payload: filterMethod}),
);

// export const changeSortMethod = createAction(
//   ActionType.ChangeSortMethod,
//   (sortMethod: string) => ({payload: sortMethod}),
// );
