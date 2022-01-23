import {
  FormEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { sendReviewAction } from '../../../../store/api-actioms';
import { getGuitar } from '../../../../store/selectors';
import { RateValue } from '../../../../const';
import { CommentPost } from '../../../../types/commentPost';

const ROWS_LIMIT = 10;

type ReviewModalProps = {
  closeModal: () => void,
  openSuccessModal: () => void,
};

export default function ReviewModal({closeModal, openSuccessModal}: ReviewModalProps): JSX.Element {
  const guitar = useSelector(getGuitar);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<CommentPost>({
    guitarId: guitar.id,
    userName: '',
    advantage: '',
    disadvantage: '',
    comment: '',
    rating: 0,
  });

  useDidMountEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  const onCloseModalEvent = useCallback(() => {
    closeModal();
    document.body.style.overflow = '';
  }, [closeModal]);

  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      onCloseModalEvent();
    }
  }, [onCloseModalEvent]);

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(sendReviewAction(formData));
    onCloseModalEvent();
    openSuccessModal();
  };

  return (
    <div className="modal is-active modal--review">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModalEvent} data-close-modal></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar.name}</h3>
          <form className="form-review" onSubmit={onSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  required
                  onInput={(evt) => setFormData({...formData, userName: evt.currentTarget.value})}
                  value={formData.userName}
                />
                {
                  formData.userName.length === 0
                    ? <span className="form-review__warning">Заполните поле</span>
                    : ''
                }
              </div>
              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-5"
                    name="rate"
                    value="5"
                    required
                    onClick={() => setFormData({...formData, rating: RateValue.Great})}
                  />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-4"
                    name="rate"
                    value="4"
                    required
                    onClick={() => setFormData({...formData, rating: RateValue.Good})}
                  />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-3"
                    name="rate"
                    value="3"
                    required
                    onClick={() => setFormData({...formData, rating: RateValue.Fine})}
                  />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-2"
                    name="rate"
                    value="2"
                    required
                    onClick={() => setFormData({...formData, rating: RateValue.Bad})}
                  />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="star-1"
                    name="rate"
                    value="1"
                    required
                    onClick={() => setFormData({...formData, rating: RateValue.Terrible})}
                  />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                  <span className="rate__count"></span>
                  {
                    formData.rating === 0
                      ? <span className="rate__message">Поставьте оценку</span>
                      : ''
                  }
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input
              className="form-review__input"
              id="pros"
              type="text"
              autoComplete="off"
              required
              onInput={(evt) => setFormData({...formData, advantage: evt.currentTarget.value})}
              value={formData.advantage}
            />
            {
              formData.advantage.length === 0
                ? <span className="form-review__warning">Заполните поле</span>
                : ''
            }
            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input
              className="form-review__input"
              id="user-name"
              type="text"
              autoComplete="off"
              required
              onInput={(evt) => setFormData({...formData, disadvantage: evt.currentTarget.value})}
              value={formData.disadvantage}
            />
            {
              formData.disadvantage.length === 0
                ? <span className="form-review__warning">Заполните поле</span>
                : ''
            }
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="user-name"
              rows={ROWS_LIMIT}
              autoComplete="off"
              required
              onInput={(evt) => setFormData({...formData, comment: evt.currentTarget.value})}
              value={formData.comment}
            >
            </textarea>
            {
              formData.comment.length === 0
                ? <span className="form-review__warning">Заполните поле</span>
                : ''
            }
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onCloseModalEvent}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
