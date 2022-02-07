import { combineReducers } from 'redux';
import { cartReducer } from './cart/cart-reducer';
import { filterReducer } from './filter/filter-reducer';
import { productReducer } from './product/product-reducer';

export const rootReducer = combineReducers({
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
