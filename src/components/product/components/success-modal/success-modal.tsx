import {
  useCallback,
  useEffect
} from 'react';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';

export default function SuccessModal({closeModal}: {closeModal: () => void}): JSX.Element {
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

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModalEvent} data-close-modal></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button
              className="button button--small modal__button modal__button--review"
              onClick={onCloseModalEvent}
            >
              К покупкам!
            </button>
          </div>
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
