import {
  Switch,
  Route
} from 'react-router-dom';
import Cart from '../cart/cart';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import Product from '../product/product';
import { AppRoute } from '../../const';

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <Main />
      </Route>
      <Route path={AppRoute.Product} exact>
        <Product />
      </Route>
      <Route path={AppRoute.Cart} exact>
        <Cart />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
