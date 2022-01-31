import { createReducer } from '@reduxjs/toolkit';
import {
  changeFilter,
  changeSearch,
  changeSorting,
  resetForm,
  setCurrentPage
} from '../actions';
import {
  DEFAULT_PAGE,
  FilterQuery,
  SearchQuery,
  SortQuery
} from '../../const';
import { FilterState } from '../../types/state';

export const initialState: FilterState = {
  sorting: SortQuery.Default,
  filter: FilterQuery.Default,
  search: SearchQuery.Default,
  formReset: false,
  currentPage: DEFAULT_PAGE,
};

export const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(changeSearch, (state, action) => {
      state.search = action.payload;
    })
    .addCase(resetForm, (state, _action) => {
      state.formReset = !state.formReset;
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    });
});
