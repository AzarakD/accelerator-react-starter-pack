import { useEffect } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { fetchCommentsAction } from '../../../../store/api-actioms';
import { getComments } from '../../../../store/selectors';
import Review from '../review/review';

export default function ReviewList({guitarId}: {guitarId: number}): JSX.Element {
  const comments = useSelector(getComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(guitarId));
  }, [dispatch, guitarId]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#todo">Оставить отзыв</a>
      {
        !comments?.length
          ? <>Отзывов нет</>
          : comments.map((comment) => <Review comment={comment} key={comment.id} />)
      }
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}
