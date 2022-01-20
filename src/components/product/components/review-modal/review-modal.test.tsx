import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeGuitar } from '../../../../mocks/guitar-data';
import ReviewModal from './review-modal';

const RATING_VALUE = 5;

const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  guitar: fakeGuitar,
});

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewModal closeModal={jest.fn()} openSuccessModal={jest.fn()} />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(`${fakeGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should do sendReview action when button clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewModal closeModal={jest.fn()} openSuccessModal={jest.fn()} />
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByDisplayValue(RATING_VALUE));
    userEvent.type(screen.getByText(/Ваше Имя/i),
      'Lorem ipsum',
    );
    userEvent.type(screen.getByText(/Достоинства/i),
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    );
    userEvent.type(screen.getByText(/Недостатки/i),
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    );
    userEvent.type(screen.getByText(/Комментарий/i),
      'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    );
    userEvent.click(screen.getByText(/Отправить отзыв/i));

    expect(dispatch).toBeCalled();
  });
});
