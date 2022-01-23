import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { internet } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  fetchCommentsAction,
  fetchGuitarAction,
  fetchGuitarsAction,
  sendReviewAction
} from './api-actioms';
import {
  makeFakeGuitar,
  makeFakeGuitarList
} from '../mocks/guitar-data';
import { State } from '../types/state';
import {
  loadComments,
  loadGuitar,
  loadGuitars,
  updateComments
} from './actions';
import { getPageFromUrl } from '../utils';
import {
  APIRoute,
  PageQuery,
  QueryKey,
  SortQuery
} from '../const';
import { makeFakeComment, makeFakeCommentList, makeFakeCommentPost } from '../mocks/comment-data';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';

const ITEM_PAGE_COUNT = 9;
const GUITAR_COUNT = 10;
const COMMENT_COUNT = 3;

const fakeGuitar = makeFakeGuitar();
const fakeGuitars = makeFakeGuitarList(GUITAR_COUNT);
const fakeComment = makeFakeComment();
const fakeComments = makeFakeCommentList(COMMENT_COUNT);
const fakeCommentPost = makeFakeCommentPost();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadGuitars when Get /guitars:query', async () => {
    const query = internet.url();
    const currentPage = getPageFromUrl(query);
    const index = currentPage * ITEM_PAGE_COUNT - ITEM_PAGE_COUNT;

    const pageQuery = query.includes(QueryKey.Page)
      ? query.replace(/page_[0-9]+/, `${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_PAGE_COUNT}`)
      : query.concat(`?${PageQuery.Start}${index}${PageQuery.Limit}${ITEM_PAGE_COUNT}`);

    const header = {'x-total-count': fakeGuitars.length};

    mockAPI
      .onGet(APIRoute.Guitars.replace(':query', pageQuery))
      .reply(200, fakeGuitars, header);

    const store = mockStore();

    await store.dispatch(fetchGuitarsAction(query));

    expect(store.getActions()).toEqual([
      loadGuitars(fakeGuitars, fakeGuitars.length),
    ]);
  });

  it('should dispatch loadGuitar when Get /guitars/:id', async () => {
    mockAPI
      .onGet(APIRoute.Guitar.replace(':id', `${fakeGuitar.id}`))
      .reply(200, fakeGuitar);

    const store = mockStore();

    await store.dispatch(fetchGuitarAction(fakeGuitar.id));

    expect(store.getActions()).toEqual([
      loadGuitar(fakeGuitar),
    ]);
  });

  it('should dispatch loadComments when Get /guitars/:id/comments', async () => {
    const route = APIRoute.Comments
      .replace(':id', `${fakeGuitar.id}`)
      .concat(SortQuery.SortToLaterDate)
      .concat(`&_limit=${COMMENT_COUNT}`);

    mockAPI.onGet(route).reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(fakeGuitar.id, COMMENT_COUNT));

    expect(store.getActions()).toEqual([
      loadComments(fakeComments),
    ]);
  });

  it('should dispatch updateComments when Post /comments', async () => {
    mockAPI
      .onPost(APIRoute.Comment)
      .reply(200, fakeComment);

    const store = mockStore({
      comments: fakeComments,
      guitar: fakeGuitar,
    });

    await store.dispatch(sendReviewAction(fakeCommentPost));

    const prevComments = store.getState().comments as Comment[];
    const storedGuitar = store.getState().guitar as Guitar;
    const update = [fakeComment, ...prevComments.slice(0, prevComments.length - 1)];
    const guitarUpdate = [fakeComment, ...storedGuitar.comments];

    expect(store.getActions()).toEqual([
      updateComments(update, guitarUpdate),
    ]);
  });
});
