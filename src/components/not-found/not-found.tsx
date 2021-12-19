import { Link, useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFound(): JSX.Element {
  const history = useHistory();
  return (
    <header className="header" id="header">
      <div className='container header__wrapper'>
        <div style={{ display: 'flex'}}>
          <Link to={AppRoute.Main} className="header__logo logo">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"></img>
          </Link>
        </div>
        <h1 className="title title--bigger">
          Ошибка 404. Страница не найдена
        </h1>
        <div style={{ marginLeft: '5%' }}>
          <button
            onClick={() => history.push(AppRoute.Main)}
            className="button button--big"
          >
            На главную
          </button>
        </div>
      </div>
    </header>
  );
}
