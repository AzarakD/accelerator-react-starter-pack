import { createReducer } from '@reduxjs/toolkit';
import {
  addToCart,
  changeFilter,
  changeSearch,
  changeSorting,
  loadComments,
  loadGuitar,
  loadGuitars,
  plusCartItemCount,
  removeFromCart,
  resetForm,
  setCartItemCount,
  setCurrentPage,
  setDiscount,
  updateComments
} from './actions';
import {
  DEFAULT_DISCOUNT,
  DEFAULT_PAGE,
  FilterQuery,
  SearchQuery,
  SortQuery
} from '../const';
import { State } from '../types/state';
import { Guitar } from '../types/guitar';

export const initialState: State = {
  guitars: [],
  guitar: {} as Guitar,
  comments: [],
  sorting: SortQuery.Default,
  filter: FilterQuery.Default,
  search: SearchQuery.Default,
  formReset: false,
  currentPage: DEFAULT_PAGE,
  totalCount: null,
  cart: [],
  discount: DEFAULT_DISCOUNT,
};

export const reducer = createReducer(initialState, (builder) => {
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
      const cart = state.cart.slice();

      cart.push({
        id: action.payload.id,
        item: action.payload,
        count: 1,
      });
      state.cart = cart;
    })
    .addCase(removeFromCart, (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      const cart = state.cart.slice();

      cart.splice(index, 1);
      state.cart = cart;
    })
    .addCase(setCartItemCount, (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      const cart = state.cart.slice();

      cart[index].count = action.payload.count;
      state.cart = cart;
    })
    .addCase(plusCartItemCount, (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      const cart = state.cart.slice();

      cart[index].count += 1;
      state.cart = cart;
    })
    .addCase(setDiscount, (state, action) => {
      state.discount = action.payload;
    });
});
