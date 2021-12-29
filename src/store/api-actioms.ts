import {
  loadGuitar,
  loadGuitars
} from './actions';
import { ThunkActionResult } from '../types/actions';
import { getPageFromUrl } from '../utils';
import {
  APIRoute,
  HEADER,
  ITEM_COUNT,
  PageQuery,
  QueryKey
} from '../const';
import { Guitar } from '../types/guitar';


export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', `${id}`));
    dispatch(loadGuitar(data));
  };

export const fetchGuitarsAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const currentPage = getPageFromUrl(query);
    const index = currentPage * ITEM_COUNT - ITEM_COUNT;

    const pageQuery = query.includes(QueryKey.Page)
      ? query.replace(/page_[0-9]+/, `${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_COUNT}`)
      : query.concat(`?${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_COUNT}`);

    try {
      const response = await api.get<Guitar[]>(APIRoute.Guitars.replace(':query', pageQuery));
      dispatch(loadGuitars(response.data, +response.headers[HEADER]));
    } catch {
      // eslint-disable-next-line no-console
      console.log('Server is not available');
    }
  };
