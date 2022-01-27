import {
  Action,
  ThunkAction,
  ThunkDispatch
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitar = 'data/loadGuitar',
  LoadComments = 'data/loadComments',
  UpdateComments = 'data/updateComments',
  ChangeSorting = 'filter/changeSorting',
  ChangeFilter = 'filter/changeFilter',
  ChangeSearch = 'filter/changeSearch',
  ResetForm = 'filter/resetForm',
  SetCurrentPage = 'filter/setCurrentPage',
  AddToCart = 'cart/addToCart',
  RemoveFromCart = 'cart/removeFromCart',
  SetCartItemCount = 'cart/setCartItemCount',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
