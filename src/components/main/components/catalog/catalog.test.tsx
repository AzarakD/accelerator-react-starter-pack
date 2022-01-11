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
import { createAPI } from '../../../../services/api';
import Catalog from './catalog';
import { State } from '../../../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: Catalog', () => {
  it('should render correctly if data is loaded', () => {
    const store = mockStore({
      isDataLoaded: true,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByTestId(/cards/i)).toBeInTheDocument();
    expect(screen.getByTestId(/pagination/i)).toBeInTheDocument();
  });

  it('should render correctly if data is loading', () => {
    const store = mockStore({
      isDataLoaded: false,
      isFailed: false,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка.../i)).toBeInTheDocument();
  });

  it('should render correctly if data is not loaded', () => {
    const store = mockStore({
      isDataLoaded: false,
      isFailed: true,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Сервер временно недоступен. Попробуйте позже./i)).toBeInTheDocument();
  });
});
