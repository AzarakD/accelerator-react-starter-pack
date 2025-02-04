import {
  DEFAULT_PAGE,
  FilterQuery
} from './const';
import { GuitarType } from './types/guitar';

const guitarType: GuitarType = {
  acoustic: 'Акустическая',
  electric: 'Электрическая',
  ukulele: 'Укулеле',
};

export const setRatingStar = (rating: number, place: number) =>
  `#icon-${ rating >= place ? 'full-star' : 'star' }`;

export const setPrice = (price: number) => price.toLocaleString().concat(' ₽');

export const setGuitarType = (type: keyof GuitarType) => guitarType[type];

export const getRandomGuitarType = (): keyof GuitarType => {
  const guitarTypes = Object.keys(guitarType);

  return guitarTypes[Math.floor(Math.random() * guitarTypes.length)] as keyof GuitarType;
};

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
    return +stringFromUrl.substring(6);
  } catch {
    return DEFAULT_PAGE;
  }
};

export const getPages = (pageCount: number) =>
  pageCount
    ? new Array(pageCount).fill(0).map((_, index) => index + 1)
    : [1];

export const getShownPages = (pages: number[], currentPage: number) => {
  let shiftBack = 2;
  let shiftForward = 1;

  if (currentPage < 2) {
    shiftBack = 1;
    shiftForward = 2;
  } else if (currentPage === pages.length) {
    shiftBack = 3;
    shiftForward = 0;
  }

  return pages.slice(currentPage - shiftBack, currentPage + shiftForward);
};

export const getIsLoadNeeded = () => {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;

  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    return true;
  }
  return false;
};
