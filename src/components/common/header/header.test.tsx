import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../services/api';
import Header from './header';
import { AppRoute } from '../../../const';
import { State } from '../../../types/state';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveClass('header__logo logo');
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when link logo clicked', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Main} exact>
              <h1>This is Main page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    const link = screen.getAllByRole('link')[0] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
