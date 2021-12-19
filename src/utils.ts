import { GuitarType } from './types/guitar';

export const setRatingStar = (rating: number, place: number) =>
  `#icon-${ rating >= place ? 'full-star' : 'star' }`;

export const setPrice = (price: number, divider=1000) =>
  `${Math.floor(price / divider)} ${price % divider === 0 ? '000' : price % divider} ₽`;

const guitarType: GuitarType = {
  acoustic: 'Акустическая',
  electric: 'Электрическая',
  ukulele: 'Укулеле',
};

export const setGuitarType = (type: keyof GuitarType) => guitarType[type];
