import {
  datatype,
  lorem
} from 'faker';
import {
  changeFilter,
  changeSearch,
  changeSorting,
  resetForm,
  setCurrentPage
} from '../actions';
import {
  initialState,
  filterReducer
} from './filter-reducer';

describe('Reducer: Filter', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change sorting', () => {
    const sorting = lorem.word();

    expect(filterReducer(initialState, changeSorting(sorting)))
      .toEqual({
        ...initialState,
        sorting: sorting,
      });
  });

  it('should change filter', () => {
    const filter = lorem.word();

    expect(filterReducer(initialState, changeFilter(filter)))
      .toEqual({
        ...initialState,
        filter: filter,
      });
  });

  it('should change search', () => {
    const search = lorem.word();

    expect(filterReducer(initialState, changeSearch(search)))
      .toEqual({
        ...initialState,
        search: search,
      });
  });

  it('should toggle reset flag', () => {

    expect(filterReducer(initialState, resetForm()))
      .toEqual({
        ...initialState,
        formReset: !initialState.formReset,
      });
  });

  it('should set current page', () => {
    const pageNumber = datatype.number();

    expect(filterReducer(initialState, setCurrentPage(pageNumber)))
      .toEqual({
        ...initialState,
        currentPage: pageNumber,
      });
  });
});
