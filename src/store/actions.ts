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

export const filterGuitars = createAction(
  ActionType.FilterGuitars,
  (guitars: Guitar[]) => ({payload: guitars}),
);
