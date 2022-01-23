import {
  datatype,
  internet,
  lorem
} from 'faker';
import { Comment } from '../types/comment';
import { CommentPost } from '../types/commentPost';

export const makeFakeComment = (): Comment => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentences(),
  rating: datatype.number(),
  createAt: datatype.string(),
  guitarId: datatype.number(),
});

export const makeFakeCommentList = (count: number): Comment[] =>
  new Array(count).fill(null).map(() => makeFakeComment());

export const makeFakeCommentPost = (): CommentPost => ({
  guitarId: datatype.number(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  comment: lorem.sentences(),
  rating: datatype.number(),
});
