import { CartItem } from './cartItem';
import { Comment } from './comment';
import { Guitar } from './guitar';
import { RootState } from '../store/root-reducer';

export type ProductState = {
  guitars: Guitar[],
  guitar: Guitar,
  comments: Comment[],
  totalCount: number | null,
};

export type FilterState = {
  sorting: string,
  filter: string,
  search: string,
  formReset: boolean,
  currentPage: number,
};

export type CartState = {
  cart: CartItem[],
  discount: number,
};

export type State = RootState;
