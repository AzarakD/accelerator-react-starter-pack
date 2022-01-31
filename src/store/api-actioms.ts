import {
  loadComments,
  loadGuitar,
  loadGuitars,
  setDiscount,
  updateComments
} from './actions';
import { getPageFromUrl } from '../utils';
import {
  APIRoute,
  COMMENT_PER_STEP,
  HEADER,
  ITEM_COUNT,
  PageQuery,
  QueryKey,
  SortQuery
} from '../const';
import { ThunkActionResult } from '../types/actions';
import { Guitar } from '../types/guitar';
import { Comment } from '../types/comment';
import { CommentPost } from '../types/commentPost';
import { CouponPost } from '../types/couponPost';

export const fetchGuitarAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', `${id}`));
    dispatch(loadGuitar(data));
  };

export const fetchCommentsAction = (id: number, commentCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const route = APIRoute.Comments
      .replace(':id', `${id}`)
      .concat(SortQuery.SortToLaterDate)
      .concat(`&_limit=${commentCount}`);

    const {data} = await api.get<Comment[]>(route);
    dispatch(loadComments(data));
  };

export const fetchGuitarsAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const currentPage = getPageFromUrl(query);
    const index = currentPage * ITEM_COUNT - ITEM_COUNT;

    const pageQuery = query.includes(QueryKey.Page)
      ? query.replace(/page_[0-9]+/, `${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_COUNT}`)
      : query.concat(`?${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_COUNT}`);

    const response = await api.get<Guitar[]>(APIRoute.Guitars.replace(':query', pageQuery));
    dispatch(loadGuitars(response.data, +response.headers[HEADER]));
  };

export const sendReviewAction = (review: CommentPost ): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.post<Comment>(APIRoute.Comment, review);

    const prevComments = getState().comments;
    const update = [data, ...prevComments.slice(0, COMMENT_PER_STEP - 1)];
    const guitarUpdate = [data, ...getState().guitar.comments];

    dispatch(updateComments(update, guitarUpdate));
  };

export const sendCouponAction = (coupon: CouponPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<number>(APIRoute.Coupons, coupon);
    dispatch(setDiscount(data));
  };
