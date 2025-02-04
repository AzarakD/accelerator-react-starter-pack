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
import { getComments } from '../../../../store/product/selectors';
import ReactFocusLock from 'react-focus-lock';
import Review from '../review/review';
import ReviewModal from '../review-modal/review-modal';
import SuccessModal from '../success-modal/success-modal';
import { getIsLoadNeeded } from '../../../../utils';
import { COMMENT_PER_STEP } from '../../../../const';
import { ReviewListProps } from './type';

export default function ReviewList({guitarId, totalComment}: ReviewListProps): JSX.Element {
  const [commentCount, setCommentCount] = useState(COMMENT_PER_STEP);
  const [isReviewModalShown, setIsReviewModalShown] = useState(false);
  const [isSuccessModalShown, setIsSuccessModalShown] = useState(false);

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
    if (getIsLoadNeeded()) {
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
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#review"
        onClick={(evt) => {
          evt.preventDefault();
          setIsReviewModalShown(true);
        }}
      >
        Оставить отзыв
      </a>
      {
        !comments?.length
          ? <>Отзывов нет</>
          : comments.map((comment) => <Review comment={comment} key={comment.id} />)
      }
      {
        commentCount < totalComment
          ?
          <button
            onClick={onShowMore}
            className="button button--medium reviews__more-button"
          >
            Показать еще отзывы
          </button>
          : ''
      }
      <a
        style={{ zIndex: '1' }}
        className="button button--up button--red-border button--big reviews__up-button"
        href="#scrollUp"
        onClick={(evt) => {
          evt.preventDefault();
          window.scroll(0,0);
        }}
      >
        Наверх
      </a>
      {
        isReviewModalShown
          ?
          <ReactFocusLock>
            <ReviewModal
              closeModal={() => setIsReviewModalShown(false)}
              openSuccessModal={() => setIsSuccessModalShown(true)}
            />
          </ReactFocusLock>
          : ''
      }
      {
        isSuccessModalShown
          ?
          <ReactFocusLock>
            <SuccessModal closeModal={() => setIsSuccessModalShown(false)} />
          </ReactFocusLock>
          : ''
      }
    </section>
  );
}
