import { FilterQuery } from './const';
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

export const checkGuitarType = (search: string) =>
  search.includes(FilterQuery.Acoustic)
  || search.includes(FilterQuery.Electric)
  || search.includes(FilterQuery.Ukulele);

export const getPriceFromUrl = (url: string, key: string) => {
  const stringFromUrl = url.split('&').filter((elem) => elem.includes(key))[0];
  try {
    return stringFromUrl.substring(10);
  } catch {
    return '';
  }
};
