import {
  changeFilter,
  changeSortMethod,
  filterGuitars,
  loadGuitar,
  loadGuitars,
  sortGuitars
} from './actions';
import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/actions';
import { Guitar } from '../types/guitar';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };

export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', `${id}`));
    dispatch(loadGuitar(data));
  };

export const filterGuitarsAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Query.replace(':query', query));

    dispatch(changeFilter(query));
    dispatch(filterGuitars(data));
  };

export const sortGuitarsAction = (query: string, sortMethod: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Query.replace(':query', query));

    dispatch(changeSortMethod(sortMethod));
    dispatch(sortGuitars(data));
  };
