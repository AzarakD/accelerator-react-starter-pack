import { useSelector } from 'react-redux';
import { getComments } from '../../../../store/selectors';
import Review from '../review/review';

export default function ReviewList(): JSX.Element {
  const comments = useSelector(getComments);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#todo">Оставить отзыв</a>
      {
        comments.map((comment) => <Review comment={comment} key={comment.id} />)
      }
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}
