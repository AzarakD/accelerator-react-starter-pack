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
import CartDeleteModal from './cart-delete-modal';

const fakeGuitar = makeFakeGuitar();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  cart: {
    cart: [],
  },
});

const deleteModal = (
  <Provider store={store}>
    <Router history={history}>
      <CartDeleteModal
        guitar={fakeGuitar}
        closeModal={jest.fn()}
      />,
    </Router>
  </Provider>
);

describe('Component: CartDeleteModal', () => {
  it('should render correctly', () => {
    render(deleteModal);

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeGuitar.name}`)).toBeInTheDocument();
  });

  it('should do removeFromCart action when "Удалить товар" clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(deleteModal);

    userEvent.click(screen.getByText(/Удалить товар/i));
    expect(dispatch).toBeCalled();
  });
});
