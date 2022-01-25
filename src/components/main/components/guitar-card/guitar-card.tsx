import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFocusLock from 'react-focus-lock';
import CartAddModal from '../../../common/cart-add-modal/cart-add-modal';
import CartAddSuccessModal from '../../../common/cart-add-success-modal/cart-add-success-modal';
import RatingStars from '../../../common/rating-stars/rating-stars';
import { setPrice } from '../../../../utils';
import { AppRoute } from '../../../../const';
import { GuitarCardProps } from './type';

export default function GuitarCard({guitar}: GuitarCardProps): JSX.Element {
  const [isAddModalShown, setIsModalShown] = useState(false);
  const [isSuccessModalShown, setIsSuccessModalShown] = useState(false);

  const {
    id,
    name,
    type,
    previewImg,
    rating,
    price,
    comments,
  } = guitar;

  return (
    <div className="product-card">
      <img src={previewImg.replace('/', '/content/')} width="75" height="190" alt={`${type} ${name}`}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <RatingStars rating={rating} />
          <span className="rate__count">{comments.length}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{setPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={AppRoute.Product.replace(':id', String(id))}
          className="button button--mini"
        >
          Подробнее
        </Link>
        <a
          onClick={(evt) => {
            evt.preventDefault();
            setIsModalShown(true);
          }}
          className="button button--red button--mini button--add-to-cart"
          href="#buy"
        >
          Купить
        </a>
      </div>
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
  );
}
