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
import { createAPI } from '../../../services/api';
import { makeFakeGuitar } from '../../../mocks/guitar-data';
import RatingStars from './rating-stars';
import { State } from '../../../types/state';

const fakeGuitar = makeFakeGuitar();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();
const history = createMemoryHistory();

const fakeRatingStars = (
  <Provider store={store}>
    <Router history={history}>
      <RatingStars rating={fakeGuitar.rating} />
    </Router>
  </Provider>
);

describe('Component: RatingStars', () => {
  it('should render correctly', () => {
    render(fakeRatingStars);

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });
});
