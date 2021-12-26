import {
  loadGuitar,
  loadGuitars
} from './actions';
import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/actions';
import { Guitar } from '../types/guitar';

export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', `${id}`));
    dispatch(loadGuitar(data));
  };

export const fetchGuitarsAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars.replace(':query', query));
    dispatch(loadGuitars(data));
  };
