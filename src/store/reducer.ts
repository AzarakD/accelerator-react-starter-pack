import { createReducer } from '@reduxjs/toolkit';
import {
  loadGuitar,
  loadGuitars
} from './actions';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

const initialState: State = {
  guitars: [],
  isDataLoaded: false,
  guitar: {} as Guitar,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitar, (state, action) => {
      state.guitar = action.payload;
    });
});
