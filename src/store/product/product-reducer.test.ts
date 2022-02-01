import { makeFakeCommentList } from '../../mocks/comment-data';
import {
  makeFakeGuitar,
  makeFakeGuitarList
} from '../../mocks/guitar-data';
import {
  loadComments,
  loadGuitar,
  loadGuitars,
  updateComments
} from '../actions';
import {
  initialState,
  productReducer
} from './product-reducer';

const GUITAR_COUNT = 10;
const COMMENT_COUNT = 3;

describe('Reducer: Product', () => {
  it('without additional parameters should return initial state', () => {
    expect(productReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load guitar list', () => {
    const fakeGuitars = makeFakeGuitarList(GUITAR_COUNT);

    expect(productReducer(initialState, loadGuitars(fakeGuitars, fakeGuitars.length)))
      .toEqual({
        ...initialState,
        guitars: fakeGuitars,
        totalCount: fakeGuitars.length,
      });
  });

  it('should load guitar', () => {
    const fakeGuitar = makeFakeGuitar();

    expect(productReducer(initialState, loadGuitar(fakeGuitar)))
      .toEqual({
        ...initialState,
        guitar: fakeGuitar,
        comments: [],
      });
  });

  it('should load comments', () => {
    const fakeComments = makeFakeCommentList(COMMENT_COUNT);

    expect(productReducer(initialState, loadComments(fakeComments)))
      .toEqual({
        ...initialState,
        comments: fakeComments,
      });
  });

  it('should update comments', () => {
    const fakeComments = makeFakeCommentList(COMMENT_COUNT);

    expect(productReducer(initialState, updateComments(fakeComments, fakeComments)))
      .toEqual({
        ...initialState,
        comments: fakeComments,
        guitar: {
          ...initialState.guitar,
          comments: fakeComments,
        },
      });
  });
});
