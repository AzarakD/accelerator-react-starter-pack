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
    try {
      const {data} = await api.get<Guitar[]>(APIRoute.Guitars.replace(':query', query));
      // eslint-disable-next-line no-console
      console.log(123);
      dispatch(loadGuitars(data));
    } catch {
      // eslint-disable-next-line no-console
      console.log('Server is not available');
    }
  };
