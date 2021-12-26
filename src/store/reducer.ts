import { createReducer } from '@reduxjs/toolkit';
import {
  changeFilter,
  changeSorting,
  loadGuitar,
  loadGuitars
} from './actions';
import {
  FilterQuery,
  SortQuery
} from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

const initialState: State = {
  guitars: [],
  isDataLoaded: false,
  guitar: {} as Guitar,
  sorting: SortQuery.Default,
  filter: FilterQuery.Default,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filter = action.payload;
    });
});
