import { createReducer } from '@reduxjs/toolkit';
import {
  loadComments,
  loadGuitar,
  loadGuitars,
  updateComments
} from '../actions';
import { Guitar } from '../../types/guitar';
import { ProductState } from '../../types/state';

export const initialState: ProductState = {
  guitars: [],
  guitar: {} as Guitar,
  comments: [],
  totalCount: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload.guitars;
      state.totalCount = action.payload.itemCount;
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
    });
});
