import {
  datatype,
  lorem
} from 'faker';
import { makeFakeCommentList } from '../mocks/comment-data';
import {
  makeFakeGuitar,
  makeFakeGuitarList
} from '../mocks/guitar-data';
import {
  changeFilter,
  changeSearch,
  changeSorting,
  failToFetchData,
  loadComments,
  loadGuitar,
  loadGuitars,
  resetForm,
  setCurrentPage,
  updateComments
} from './actions';
import {
  initialState,
  reducer
} from './reducer';

const GUITAR_COUNT = 10;
const COMMENT_COUNT = 3;

describe('Reducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load guitar list', () => {
    const fakeGuitars = makeFakeGuitarList(GUITAR_COUNT);

    expect(reducer(initialState, loadGuitars(fakeGuitars, fakeGuitars.length)))
      .toEqual({
        ...initialState,
        guitars: fakeGuitars,
        totalCount: fakeGuitars.length,
        isDataLoaded: true,
        isFailed: false,
      });
  });

  it('should show fail message', () => {

    expect(reducer(initialState, failToFetchData()))
      .toEqual({
        ...initialState,
        isDataLoaded: false,
        isFailed: true,
      });
  });

  it('should load guitar', () => {
    const fakeGuitar = makeFakeGuitar();

    expect(reducer(initialState, loadGuitar(fakeGuitar)))
      .toEqual({
        ...initialState,
        guitar: fakeGuitar,
        comments: [],
      });
  });

  it('should load comments', () => {
    const fakeComments = makeFakeCommentList(COMMENT_COUNT);

    expect(reducer(initialState, loadComments(fakeComments)))
      .toEqual({
        ...initialState,
        comments: fakeComments,
      });
  });

  it('should update comments', () => {
    const fakeComments = makeFakeCommentList(COMMENT_COUNT);

    expect(reducer(initialState, updateComments(fakeComments, fakeComments)))
      .toEqual({
        ...initialState,
        comments: fakeComments,
        guitar: {
          ...initialState.guitar,
          comments: fakeComments,
        },
      });
  });

  it('should change sorting', () => {
    const sorting = lorem.word();

    expect(reducer(initialState, changeSorting(sorting)))
      .toEqual({
        ...initialState,
        sorting: sorting,
      });
  });

  it('should change filter', () => {
    const filter = lorem.word();

    expect(reducer(initialState, changeFilter(filter)))
      .toEqual({
        ...initialState,
        filter: filter,
      });
  });

  it('should change search', () => {
    const search = lorem.word();

    expect(reducer(initialState, changeSearch(search)))
      .toEqual({
        ...initialState,
        search: search,
      });
  });

  it('should toggle reset flag', () => {

    expect(reducer(initialState, resetForm()))
      .toEqual({
        ...initialState,
        formReset: !initialState.formReset,
      });
  });

  it('should set current page', () => {
    const pageNumber = datatype.number();

    expect(reducer(initialState, setCurrentPage(pageNumber)))
      .toEqual({
        ...initialState,
        currentPage: pageNumber,
      });
  });
});
