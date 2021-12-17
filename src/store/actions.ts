import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[]) => ({payload: guitars}),
);
