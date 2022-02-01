import {
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../../services/api';
import Catalog from './catalog';
import {
  DEFAULT_PAGE,
  FilterQuery,
  SearchQuery,
  SortQuery
} from '../../../../const';
import { State } from '../../../../types/state';
import { makeFakeGuitarList } from '../../../../mocks/guitar-data';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();
const store = mockStore({
  product: {
    guitars: makeFakeGuitarList(9),
  },
  filter: {
    filter: FilterQuery.Default,
    sorting: SortQuery.Default,
    search: SearchQuery.Default,
    currentPage: DEFAULT_PAGE,
  },
  cart: {
    cart: [],
  },
});

describe('Component: Catalog', () => {
  it('should render correctly if data is loading', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });

  it('should render correctly if data is loaded', async () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Загрузка .../)).not.toBeInTheDocument();
    });
    // expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByTestId(/cards/i)).toBeInTheDocument();
    expect(screen.getByTestId(/pagination/i)).toBeInTheDocument();
  });

  it('should render correctly if data is not loaded', async () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.reject());
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Загрузка .../)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/Сервер временно недоступен. Попробуйте позже./i)).toBeInTheDocument();
  });
});
