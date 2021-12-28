import { FilterQuery } from './const';
import { GuitarType } from './types/guitar';

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

export const getSearchFromUrl = (url: string) => {
  const stringFromUrl = url.split('&').filter((elem) => elem.includes('name_like='))[0];
  try {
    return stringFromUrl.substring(10);
  } catch {
    return '';
  }
};

export const getPageFromUrl = (url: string) => {
  const stringFromUrl = url.split('&').filter((elem) => elem.includes('page_'))[0];
  try {
    return stringFromUrl.substring(6);
  } catch {
    return '1';
  }
};
