import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { makeFakeGuitar } from '../../../mocks/guitar-data';
import CartAddModal from './cart-add-modal';

const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  cart: {
    cart: [],
  },
});

describe('Component: CartAddModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CartAddModal
            guitar={fakeGuitar}
            closeModal={jest.fn()}
            openSuccessModal={jest.fn()}
          />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeGuitar.name}`)).toBeInTheDocument();
  });
});
