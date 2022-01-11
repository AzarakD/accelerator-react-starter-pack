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
import Pagination from './pagination';
import { State } from '../../../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();
const history = createMemoryHistory();

const fakePagination = (
  <Provider store={store}>
    <Router history={history}>
      <Pagination />
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(fakePagination);

    expect(screen.getByTestId(/pagination/i)).toBeInTheDocument();
  });
});
