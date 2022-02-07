import { CartItem } from '../../types/cartItem';
import { State } from '../../types/state';

export const getCart = ({cart}: State): CartItem[] => cart.cart;
export const getDiscount = ({cart}: State): number => cart.discount;
