import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Link,
  useParams
} from 'react-router-dom';
import { fetchGuitarAction } from '../../store/api-actioms';
import { getGuitar } from '../../store/selectors';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Icons from '../common/icons/icons';
import RatingStars from '../common/rating-stars/rating-stars';
import ReviewList from './components/review-list/review-list';
import {
  setGuitarType,
  setPrice
} from '../../utils';
import { AppRoute } from '../../const';

export default function Product(): JSX.Element {
  const guitar = useSelector(getGuitar);
  const dispatch = useDispatch();

  const {id}: {id: string} = useParams();
  const guitarId = Number(id);

  useEffect(() => {
    if (guitar.id !== guitarId) {
      dispatch(fetchGuitarAction(guitarId));
    }
  });

  if (guitar.id !== guitarId) {
    return <>Loading...</>;
  }

  const {
    name,
    vendorCode,
    type,
    description,
    previewImg,
    stringCount,
    rating,
    price,
  } = guitar;

  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'#'} className="link">Товар</Link>
              </li>
            </ul>
            <div className="product-container">
              <img
                className="product-container__img"
                src={`/${previewImg.replace('/', '/content/')}`}
                width="90"
                height="235"
                alt={`${type} ${name}`}
              >
              </img>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
                <div className="rate product-container__rating" aria-hidden="true">
                  <RatingStars rating={rating} />
                  <span className="rate__count"></span>
                  <span className="rate__message"></span>
                </div>
                <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
                  <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                  <div className="tabs__content" id="characteristics">
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">
                            {setGuitarType(type)}
                          </td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{`${stringCount} струнная`}</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tabs__product-description hidden">{description}</p>
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{setPrice(price)}</p>
                <a className="button button--red button--big product-container__button" href="#todo">Добавить в корзину</a>
              </div>
            </div>

            <ReviewList />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
