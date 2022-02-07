import { makeFakeGuitar } from '../../mocks/guitar-data';
import {
  addToCart,
  plusCartItemCount,
  removeFromCart,
  setCartItemCount,
  setDiscount
} from '../actions';
import { CartState } from '../../types/state';
import {
  initialState,
  cartReducer
} from './cart-reducer';

describe('Reducer: Cart', () => {
  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should add item to Cart', () => {
    const fakeGuitar = makeFakeGuitar();

    expect(cartReducer(initialState, addToCart(fakeGuitar)))
      .toEqual({
        ...initialState,
        cart: [
          ...initialState.cart,
          {
            id: fakeGuitar.id,
            item: fakeGuitar,
            count: 1,
          },
        ],
      });
  });

  it('should remove item from Cart', () => {
    const fakeGuitar = makeFakeGuitar();

    expect(cartReducer(initialState, removeFromCart(fakeGuitar.id)))
      .toEqual({
        ...initialState,
        cart: [],
      });
  });

  it('should set count of Cart item', () => {
    const fakeGuitar = makeFakeGuitar();
    const COUNT = 2;
    const state: CartState = {
      cart: [{
        id: fakeGuitar.id,
        item: fakeGuitar,
        count: 1,
      }],
      discount: 0,
    };

    expect(cartReducer(state, setCartItemCount(fakeGuitar.id, COUNT)))
      .toEqual({
        ...state,
        cart: [{
          id: fakeGuitar.id,
          item: fakeGuitar,
          count: COUNT,
        }],
      });
  });

  it('should plus count of Cart item', () => {
    const fakeGuitar = makeFakeGuitar();
    const state: CartState = {
      cart: [{
        id: fakeGuitar.id,
        item: fakeGuitar,
        count: 1,
      }],
      discount: 0,
    };

    expect(cartReducer(state, plusCartItemCount(fakeGuitar.id)))
      .toEqual({
        ...state,
        cart: [{
          id: fakeGuitar.id,
          item: fakeGuitar,
          count: 2,
        }],
      });
  });

  it('should set discount', () => {
    const DISCOUNT = 10;

    expect(cartReducer(initialState, setDiscount(DISCOUNT)))
      .toEqual({
        ...initialState,
        discount: DISCOUNT,
      });
  });
});
