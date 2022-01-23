import RatingStars from '../../../common/rating-stars/rating-stars';
import { ReviewProps } from './type';

export default function Review({comment}: ReviewProps): JSX.Element {
  const {
    userName,
    advantage,
    disadvantage,
    rating,
    createAt,
  } = comment;

  const getCommentDate = () => new Date(Date.parse(createAt))
    .toLocaleString('ru', {
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{getCommentDate()}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <RatingStars rating={rating} />
        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}
