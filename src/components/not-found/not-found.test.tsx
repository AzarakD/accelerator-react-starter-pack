import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Route,
  Router,
  Switch
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from './not-found';
import { AppRoute } from '../../const';

const history = createMemoryHistory();

const fakeNotFound = (
  <Router history={history}>
    <Switch>
      <Route path={AppRoute.Main} exact>
        <h1>This is Main page</h1>
      </Route>
      <Route>
        <NotFound />
      </Route>,
    </Switch>
  </Router>
);

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFound />
      </Router>,
    );

    expect(screen.getByText(/Ошибка 404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when "На главную" clicked', () => {
    history.push('fake');
    render(fakeNotFound);

    const link = screen.getByRole('button') as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when logo clicked', () => {
    history.push('fake');
    render(fakeNotFound);

    const link = screen.getByRole('link') as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
