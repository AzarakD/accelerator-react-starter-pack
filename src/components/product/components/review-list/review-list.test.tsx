import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { makeFakeCommentList } from '../../../../mocks/comment-data';
import { makeFakeGuitar } from '../../../../mocks/guitar-data';
import { createAPI } from '../../../../services/api';
import ReviewList from './review-list';
import { State } from '../../../../types/state';

const ITEM_COUNT = 3;

const fakeGuitar = makeFakeGuitar();
const fakeComments = makeFakeCommentList(ITEM_COUNT);
const history = createMemoryHistory();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: ReviewList', () => {
  it('should render correctly when comments are not loaded', () => {
    const store = mockStore({
      guitar: fakeGuitar,
      comments: [],
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewList guitarId={fakeGuitar.id} totalComment={fakeGuitar.comments.length} />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Отзывов нет/i)).toBeInTheDocument();
  });

  it('should render correctly when comments are loaded', () => {
    const store = mockStore({
      guitar: fakeGuitar,
      comments: fakeComments,
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewList guitarId={fakeGuitar.id} totalComment={fakeGuitar.comments.length} />,
        </Router>
      </Provider>,
    );

    fakeComments.forEach((elem) => {
      expect(screen.getByText(`${elem.userName}`)).toBeInTheDocument();
    });
  });
});
