import {
  filterGuitars,
  loadGuitar,
  loadGuitars,
  sortGuitars
} from './actions';
import {
  APIRoute,
  SortMethods
} from '../const';
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

export const filterGuitarsAction = (type: string): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Query.replace(':query', type));
    dispatch(filterGuitars(data));

    if (getState().sortMethod !== SortMethods.Default) {
      dispatch(sortGuitars(getState().sortMethod));
    }
  };
