import { createReducer } from '@reduxjs/toolkit';
import {
  // changeSortMethod,
  displayGuitars,
  filterGuitars,
  loadGuitar,
  loadGuitars,
  sortGuitars
} from './actions';
import {
  filterItems,
  sortItems
} from '../utils';
import { SortMethods } from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

const initialState: State = {
  guitars: [],
  isDataLoaded: false,
  guitar: {} as Guitar,
  displayedGuitars: [],
  sortMethod: SortMethods.Default,
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
    .addCase(displayGuitars, (state, action) => {
      state.displayedGuitars = action.payload;
    })
    .addCase(sortGuitars, (state, action) => {
      state.displayedGuitars = sortItems(state.displayedGuitars, action.payload);
      state.sortMethod = action.payload;
    })
    .addCase(filterGuitars, (state, action) => {
      state.displayedGuitars = filterItems(state.guitars, action.payload);
    });
  // .addCase(changeSortMethod, (state, action) => {
  //   state.sortMethod = action.payload;
  // });
});
