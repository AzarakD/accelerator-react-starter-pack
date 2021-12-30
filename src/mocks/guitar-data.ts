import {
  datatype,
  internet,
  lorem,
  name
} from 'faker';
import { getRandomGuitarType } from '../utils';
import { Guitar } from '../types/guitar';

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(),
  name: name.title(),
  vendorCode: datatype.string(),
  type: getRandomGuitarType(),
  description: lorem.paragraph(),
  previewImg: internet.url(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
});

export const makeFakeGuitarList = (count: number): Guitar[] =>
  new Array(count).fill(null).map(() => makeFakeGuitar());
