import {
  Link,
  useHistory
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCart } from '../../../store/cart/selectors';
import FormSearch from './form-search/form-search';
import { AppRoute } from '../../../const';

const INIT_COUNT = 0;

export default function Header(): JSX.Element {
  const cart = useSelector(getCart);
  const history = useHistory();

  const counter = cart?.reduce((sum, {count}) => sum + count, INIT_COUNT);
  const pathname = history.location.pathname;

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to={AppRoute.Main} className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link to={AppRoute.Main} className={`link main-nav__link ${pathname === AppRoute.Main ? 'link--current' : ''}`}>
                Каталог
              </Link>
            </li>
            <li>
              <a className="link main-nav__link" href="#todo">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="#todo">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {
            counter
              ? <span className="header__cart-count">{counter}</span>
              : ''
          }
        </Link>
      </div>
    </header>
  );
}
