import { createReducer } from '@reduxjs/toolkit';
import {
  changeFilter,
  changeSearch,
  changeSorting,
  failToFetchData,
  loadComments,
  loadGuitar,
  loadGuitars,
  resetComments,
  resetForm,
  setCurrentPage
} from './actions';
import {
  DEFAULT_PAGE,
  FilterQuery,
  SearchQuery,
  SortQuery
} from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

export const initialState: State = {
  guitars: [],
  isDataLoaded: false,
  isFailed: false,
  guitar: {} as Guitar,
  comments: [],
  sorting: SortQuery.Default,
  filter: FilterQuery.Default,
  search: SearchQuery.Default,
  formReset: false,
  currentPage: DEFAULT_PAGE,
  totalCount: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload.guitars;
      state.totalCount = action.payload.itemCount;
      state.isDataLoaded = true;
      state.isFailed = false;
    })
    .addCase(failToFetchData, (state, _action) => {
      state.isDataLoaded = false;
      state.isFailed = true;
    })
    .addCase(loadGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(resetComments, (state, _action) => {
      state.comments = [];
    })
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
