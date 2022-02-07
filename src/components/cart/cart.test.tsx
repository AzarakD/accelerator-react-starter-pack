import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Cart from './cart';

const DISCOUNT = 0;

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  filter: {
    formReset: false,
  },
  cart: {
    cart: [],
    discount: DISCOUNT,
  },
});

describe('Component: Cart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cart />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
