import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars } from './actions';
import { State } from '../types/state';

const initialState: State = {
  guitarList: [],
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitarList = action.payload;
      state.isDataLoaded = true;
    });
});
