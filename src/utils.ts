import { SortMethods } from './const';
import {
  Guitar,
  GuitarType
} from './types/guitar';

const guitarType: GuitarType = {
  acoustic: 'Акустическая',
  electric: 'Электрическая',
  ukulele: 'Укулеле',
};

export const setRatingStar = (rating: number, place: number) =>
  `#icon-${ rating >= place ? 'full-star' : 'star' }`;

export const setPrice = (price: number, divider=1000) =>
  `${Math.floor(price / divider)} ${price % divider === 0 ? '000' : price % divider} ₽`;

export const setGuitarType = (type: keyof GuitarType) => guitarType[type];

export const filterByName = (items: Guitar[], name: string) => items.filter(
  (item) => item.name
    .toLowerCase()
    .includes(name),
);

export const sortToBiggerPrice = (items: Guitar[]) =>
  items.slice().sort((a, b) => a.price - b.price);

export const sortToLesserPrice = (items: Guitar[]) =>
  items.slice().sort((a, b) => b.price - a.price);

export const sortToBiggerRating = (items: Guitar[]) =>
  items.slice().sort((a, b) => a.rating - b.rating);

export const sortToLesserRating = (items: Guitar[]) =>
  items.slice().sort((a, b) => b.rating - a.rating);

export const sortItems = (items: Guitar[], sortMethod: string) => {
  switch (sortMethod) {
    case SortMethods.SortToBiggerPrice:
      return sortToBiggerPrice(items);

    case SortMethods.SortToLesserPrice:
      return sortToLesserPrice(items);

    case SortMethods.SortToBiggerRating:
      return sortToBiggerRating(items);

    case SortMethods.SortToLesserRating:
      return sortToLesserRating(items);

    default:
      return items;
  }
};
