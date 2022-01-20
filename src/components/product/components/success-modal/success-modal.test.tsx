import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import SuccessModal from './success-modal';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: SuccessModal', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <SuccessModal closeModal={jest.fn()} />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
  });
});
