import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';
import { AppRoute } from '../../../const';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveClass('footer__logo logo');
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
  });

  it('should redirect to "Main" when link logo clicked', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is Main page</h1>
          </Route>
          <Route>
            <Footer />
          </Route>
        </Switch>
      </Router>);

    const link = screen.getAllByRole('link')[0] as HTMLAnchorElement;

    expect(screen.queryByText(/This is Main page/i)).not.toBeInTheDocument();
    userEvent.click(link);
    expect(screen.getByText(/This is Main page/i)).toBeInTheDocument();
  });
});
