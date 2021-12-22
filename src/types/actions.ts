import {
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitar = 'data/loadGuitar',
  DisplayGuitars = 'app/displayGuitars',
  SortGuitars = 'app/sortGuitars',
  FilterGuitars = 'app/filterGuitars',
  // ChangeSortMethod = 'app/changeSortMethod',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
