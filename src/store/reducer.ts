import { createReducer } from '@reduxjs/toolkit';
import {
  addToCart,
  changeFilter,
  changeSearch,
  changeSorting,
  failToFetchData,
  loadComments,
  loadGuitar,
  loadGuitars,
  resetForm,
  setCurrentPage,
  updateComments
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
  cart: [],
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
      state.comments = [];
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(updateComments, (state, action) => {
      state.comments = action.payload.comments;
      state.guitar.comments = action.payload.guitarComments;
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
    })
    .addCase(addToCart, (state, action) => {
      state.cart = [...state.cart, action.payload];
    });
});
