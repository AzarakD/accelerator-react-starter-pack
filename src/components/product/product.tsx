import {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  Link,
  useParams
} from 'react-router-dom';
import ReactFocusLock from 'react-focus-lock';
import { fetchGuitarAction } from '../../store/api-actioms';
import { getGuitar } from '../../store/product/selectors';
import CartAddModal from '../common/cart-add-modal/cart-add-modal';
import CartAddSuccessModal from '../common/cart-add-success-modal/cart-add-success-modal';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Icons from '../common/icons/icons';
import RatingStars from '../common/rating-stars/rating-stars';
import Tabs from './components/tabs/tabs';
import ReviewList from './components/review-list/review-list';
import { setPrice } from '../../utils';
import { AppRoute } from '../../const';

export default function Product(): JSX.Element {
  const [isAddModalShown, setIsModalShown] = useState(false);
  const [isSuccessModalShown, setIsSuccessModalShown] = useState(false);

  const guitar = useSelector(getGuitar);
  const dispatch = useDispatch();

  const {id}: {id: string} = useParams();
  const guitarId = Number(id);

  useEffect(() => {
    if (guitar.id !== guitarId) {
      dispatch(fetchGuitarAction(guitarId));
    }
  }, [dispatch, guitar.id, guitarId]);

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
    comments,
  } = guitar;

  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">{name}</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'#'} className="link">{name}</Link>
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
                  <span className="rate__count">{comments.length}</span>
                  <span className="rate__message"></span>
                </div>
                <Tabs
                  vendorCode={vendorCode}
                  type={type}
                  stringCount={stringCount}
                  description={description}
                />
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{setPrice(price)}</p>
                <a
                  onClick={(evt) => {
                    evt.preventDefault();
                    setIsModalShown(true);
                  }}
                  className="button button--red button--big product-container__button"
                  href="#buy"
                >
                  Добавить в корзину
                </a>
              </div>
            </div>

            <ReviewList guitarId={guitar.id} totalComment={comments.length} />
            {
              isAddModalShown
                ?
                <ReactFocusLock>
                  <CartAddModal
                    guitar={guitar}
                    closeModal={() => setIsModalShown(false)}
                    openSuccessModal={() => setIsSuccessModalShown(true)}
                  />
                </ReactFocusLock>
                : ''
            }
            {
              isSuccessModalShown
                ?
                <ReactFocusLock>
                  <CartAddSuccessModal closeModal={() => setIsSuccessModalShown(false)} />
                </ReactFocusLock>
                : ''
            }
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
