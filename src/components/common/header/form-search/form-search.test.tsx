import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../../services/api';
import FormSearch from './form-search';
import { State } from '../../../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();
const history = createMemoryHistory();

const fakeFormSearch = (
  <Provider store={store}>
    <Router history={history}>
      <FormSearch />
    </Router>
  </Provider>
);

describe('Component: FormSearch', () => {
  it('should render correctly', () => {
    render(fakeFormSearch);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('form-search__submit');
  });

  it('should reset forms and fetch when submit', () => {
    const dispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(fakeFormSearch);

    const input = screen.getByPlaceholderText('что вы ищите?');

    userEvent.type(input, 'Lorem ipsum');
    fireEvent.submit(input);

    expect(dispatch).toBeCalled();
  });
});
