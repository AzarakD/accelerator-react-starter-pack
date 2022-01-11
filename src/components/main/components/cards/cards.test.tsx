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
import { makeFakeGuitarList } from '../../../../mocks/guitar-data';
import Cards from './cards';
import { State } from '../../../../types/state';

const GUITAR_COUNT = 10;

const fakeGuitars = makeFakeGuitarList(GUITAR_COUNT);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: Cards', () => {
  it('should render correctly if there are guitars', () => {
    const store = mockStore({
      guitars: fakeGuitars,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Cards />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/cards/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Подробнее/i)).toBeTruthy();
    expect(screen.getAllByText(/Купить/i)).toBeTruthy();
  });

  it('should render correctly if there are no guitars', () => {
    const store = mockStore({
      guitars: [],
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Cards />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/cards/i)).toBeInTheDocument();
    expect(screen.getByText(/Товар не найден./i)).toBeInTheDocument();
  });
});
