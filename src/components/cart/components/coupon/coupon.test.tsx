import {
  render,
  screen,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { datatype } from 'faker';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../../services/api';
import Coupon from './coupon';
import { State } from '../../../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  filter: {
    formReset: false,
  },
});
const history = createMemoryHistory({});

const fakeFormSearch = (
  <Provider store={store}>
    <Router history={history}>
      <Coupon />
    </Router>
  </Provider>
);

describe('Component: Coupon', () => {
  it('should render correctly', () => {
    render(fakeFormSearch);

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('button button--big coupon__button');
  });

  it('should do sendCouponAction when submit', async () => {
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve());
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(dispatch);

    render(fakeFormSearch);

    const input = screen.getByPlaceholderText('Введите промокод');

    userEvent.type(input, datatype.string());
    userEvent.click(screen.getByText(/Применить/i));

    await waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });
});
