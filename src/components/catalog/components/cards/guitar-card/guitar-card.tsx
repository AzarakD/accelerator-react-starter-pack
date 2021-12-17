import RatingStars from './rating-stars/rating-stars';
import { setPrice } from '../../../../../utils';
import { GuitarCardProps } from './type';

export default function GuitarCard({guitar}: GuitarCardProps): JSX.Element {
  const {
    name,
    type,
    previewImg,
    rating,
    price,
  } = guitar;

  return (
    <div className="product-card">
      <img src={previewImg.replace('/', '/content/')} width="75" height="190" alt={`${type} ${name}`}/>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <RatingStars rating={rating}/>
          <span className="rate__count">9</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{setPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#todo">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
      </div>
    </div>
  );
}
