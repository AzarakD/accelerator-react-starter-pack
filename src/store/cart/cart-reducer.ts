import { createReducer } from '@reduxjs/toolkit';
import {
  addToCart,
  plusCartItemCount,
  removeFromCart,
  setCartItemCount,
  setDiscount
} from '../actions';
import { DEFAULT_DISCOUNT } from '../../const';
import { CartState } from '../../types/state';

export const initialState: CartState = {
  cart: [],
  discount: DEFAULT_DISCOUNT,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
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
