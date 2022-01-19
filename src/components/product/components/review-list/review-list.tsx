import {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useDebounce } from '../../../../hooks/use-debounce';
import { fetchCommentsAction } from '../../../../store/api-actioms';
import { getComments } from '../../../../store/selectors';
import Review from '../review/review';
import { ReviewListProps } from './type';

const COMMENT_PER_STEP = 3;

export default function ReviewList({guitarId, totalComment}: ReviewListProps): JSX.Element {
  const [commentCount, setCommentCount] = useState(COMMENT_PER_STEP);

  const comments = useSelector(getComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsAction(guitarId, commentCount));
  }, [dispatch, guitarId, commentCount]);

  const onShowMore = useCallback(() => {
    if (commentCount < totalComment) {
      setCommentCount(commentCount + COMMENT_PER_STEP);
    }
  }, [commentCount, totalComment]);

  const debouncedShowMore = useDebounce(() => onShowMore);

  const onScroll = useCallback(() => {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;

    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      debouncedShowMore();
    }
  }, [debouncedShowMore]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#todo">Оставить отзыв</a>
      {
        !comments?.length
          ? <>Отзывов нет</>
          : comments.map((comment) => <Review comment={comment} key={comment.id} />)
      }
      {
        commentCount >= totalComment
          ? ''
          :
          <button
            onClick={onShowMore}
            className="button button--medium reviews__more-button"
          >
            Показать еще отзывы
          </button>
      }
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}
