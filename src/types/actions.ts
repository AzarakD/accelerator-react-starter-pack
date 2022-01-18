import {
  Action,
  ThunkAction
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitar = 'data/loadGuitar',
  LoadComments = 'data/loadComments',
  FailToFetchData = 'data/failToFetchData',
  ChangeSorting = 'app/changeSorting',
  ChangeFilter = 'app/changeFilter',
  ChangeSearch = 'app/changeSearch',
  ResetForm = 'app/resetForm',
  ResetComments = 'app/resetComments',
  SetCurrentPage = 'app/setCurrentPage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
