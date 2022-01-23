import {
  datatype,
  internet,
  lorem,
  name
} from 'faker';
import { getRandomGuitarType } from '../utils';
import { Guitar } from '../types/guitar';
import { makeFakeCommentList } from './comment-data';

const ITEM_COUNT = 5;

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
  comments: makeFakeCommentList(ITEM_COUNT),
});

export const makeFakeGuitarList = (count: number): Guitar[] =>
  new Array(count).fill(null).map(() => makeFakeGuitar());
