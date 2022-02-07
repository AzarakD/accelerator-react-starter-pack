import {
  render,
  screen
} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import * as Redux from 'react-redux';
import { createAPI } from '../../../../services/api';
import { makeFakeGuitar } from '../../../../mocks/guitar-data';
import CartItem from './cart-item';
import { State } from '../../../../types/state';

const fakeGuitar = makeFakeGuitar();

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  cart: {
    cart: [{
      id: fakeGuitar.id,
      item: fakeGuitar,
      count: 5,
    }],
  },
});
const history = createMemoryHistory();

const cartItem = (
  <Provider store={store}>
    <Router history={history}>
      <CartItem guitar={fakeGuitar} />
    </Router>
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    render(cartItem);

    expect(screen.getByText(`${fakeGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeGuitar.vendorCode}`)).toBeInTheDocument();
  });

  it('should do setCartItemCount action when plus clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(cartItem);

    userEvent.click(screen.getByTestId(/plus/i));
    expect(dispatch).toBeCalled();
  });

  it('should do setCartItemCount action when minus clicked', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(cartItem);

    userEvent.click(screen.getByTestId(/minus/i));
    expect(dispatch).toBeCalled();
  });
});
