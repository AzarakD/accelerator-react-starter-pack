import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeComment } from '../../../../mocks/comment-data';
import Review from './review';

const fakeComment = makeFakeComment();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: Review', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <Review comment={fakeComment} />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.comment}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.userName}`)).toBeInTheDocument();
  });
});
