import { createReducer } from '@reduxjs/toolkit';
import {
  changeFilter,
  changeSortMethod,
  displayGuitars,
  filterGuitars,
  loadGuitar,
  loadGuitars,
  sortGuitars
} from './actions';
import { SortMethods } from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

const initialState: State = {
  guitars: [],
  isDataLoaded: false,
  guitar: {} as Guitar,
  displayedGuitars: [],
  sortMethod: SortMethods.Default,
  filter: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
      state.displayedGuitars = action.payload;
    })
    .addCase(loadGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(displayGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
    })
    .addCase(sortGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
    })
    .addCase(changeSortMethod, (state, action) => {
      state.sortMethod = action.payload;
    })
    .addCase(filterGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.filter = action.payload;
    });
});
