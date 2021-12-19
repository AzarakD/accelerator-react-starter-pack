import {
  Link,
  useHistory
} from 'react-router-dom';
import FormSearch from './form-search/form-search';
import { AppRoute } from '../../../const';

export default function Header(): JSX.Element {
  const history = useHistory();
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
        <a className="header__cart-link" href="#todo" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}
