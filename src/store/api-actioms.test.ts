import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { internet } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  fetchGuitarAction,
  fetchGuitarsAction
} from './api-actioms';
import {
  makeFakeGuitar,
  makeFakeGuitarList
} from '../mocks/guitar-data';
import {
  APIRoute,
  PageQuery,
  QueryKey
} from '../const';
import { State } from '../types/state';

import { loadGuitar, loadGuitars } from './actions';
import { getPageFromUrl } from '../utils';

const ITEM_PAGE_COUNT = 9;
const FILM_COUNT = 10;

const fakeGuitar = makeFakeGuitar();
const fakeGuitars = makeFakeGuitarList(FILM_COUNT);

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
});
