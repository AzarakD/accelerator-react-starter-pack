import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Guitar } from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[], itemCount: number) => ({payload: {
    guitars: guitars,
    itemCount: itemCount,
  }}),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({payload: guitar}),
);

export const changeSorting = createAction(
  ActionType.ChangeSorting,
  (sorting: string) => ({payload: sorting}),
);

export const changeFilter = createAction(
  ActionType.ChangeFilter,
  (filter: string) => ({payload: filter}),
);

export const changeSearch = createAction(
  ActionType.ChangeSearch,
  (search: string) => ({payload: search}),
);

export const resetForm = createAction(
  ActionType.ResetForm,
);

export const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number) => ({payload: currentPage}),
);
