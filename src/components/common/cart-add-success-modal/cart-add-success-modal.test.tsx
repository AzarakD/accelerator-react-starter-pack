import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch
} from 'react-router-dom';
import CartAddSuccessModal from './cart-add-success-modal';
import { AppRoute } from '../../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();

describe('Component: CartAddSuccessModal', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartAddSuccessModal closeModal={jest.fn()} />,
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when "Продолжить покупки" clicked', () => {
    history.push('fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <CartAddSuccessModal closeModal={jest.fn()} />,
          </Route>,
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Продолжить покупки/i));
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });

  it('should redirect to "Cart" when "Перейти в корзину" clicked', () => {
    history.push('fake');

    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Cart} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <CartAddSuccessModal closeModal={jest.fn()} />,
          </Route>,
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Перейти в корзину/i));
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
