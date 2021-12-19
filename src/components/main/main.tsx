import { Link } from 'react-router-dom';
import Catalog from './components/catalog/catalog';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Icons from '../common/icons/icons';
import { AppRoute } from '../../const';

export default function Main(): JSX.Element {
  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'#'} className="link">Каталог</Link>
              </li>
            </ul>
            <Catalog />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
