import { createReducer } from '@reduxjs/toolkit';
import { loadGuitars } from './actions';
import { State } from '../types/state';

const initialState: State = {
  guitars: [],
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    });
});
