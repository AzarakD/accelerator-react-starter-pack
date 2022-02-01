import {
  render,
  screen
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './app';
import { createAPI } from '../../services/api';
import {
  makeFakeGuitar,
  makeFakeGuitarList
} from '../../mocks/guitar-data';
import { makeFakeCommentList } from '../../mocks/comment-data';
import {
  AppRoute,
  DEFAULT_PAGE,
  FilterQuery,
  SearchQuery,
  SortQuery
} from '../../const';
import { State } from '../../types/state';

const ITEM_COUNT = 10;

const fakeGuitar = makeFakeGuitar();
const fakeGuitars = makeFakeGuitarList(ITEM_COUNT);
const fakeComments = makeFakeCommentList(ITEM_COUNT);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  product: {
    guitars: fakeGuitars,
    guitar: fakeGuitar,
    comments: fakeComments,
    totalCount: ITEM_COUNT,
  },
  filter: {
    sorting: SortQuery.Default,
    filter: FilterQuery.Default,
    search: SearchQuery.Default,
    formReset: false,
    currentPage: DEFAULT_PAGE,
  },
  cart: {
    cart: [],
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "Product" when user navigate to "/guitars/:id"', () => {
    history.push(AppRoute.Product.replace(':id', `${fakeGuitar.id}`));
    render(fakeApp);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/404');
    render(fakeApp);

    expect(screen.getByText(/Ошибка 404. Страница не найдена/i)).toBeInTheDocument();
  });
});
