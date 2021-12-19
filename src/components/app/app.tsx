import {
  Switch,
  Route
} from 'react-router-dom';
import Main from '../main/main';
import { AppRoute } from '../../const';
import NotFound from '../not-found/not-found';

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <Main />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
