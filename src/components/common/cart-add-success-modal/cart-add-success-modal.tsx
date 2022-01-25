import {
  useCallback,
  useEffect
} from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useDidMountEffect } from '../../../hooks/use-did-mount-effect';

export default function CartAddSuccessModal({closeModal}: {closeModal: () => void}): JSX.Element {
  const history = useHistory();

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

  const onGoToCartEvent = () => {
    onCloseModalEvent();
    history.push(AppRoute.Cart);
  };

  const onContinueEvent = () => {
    onCloseModalEvent();
    history.push(AppRoute.Main);
  };

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModalEvent} data-close-modal></div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <button
              className="button button--small modal__button"
              onClick={onGoToCartEvent}
            >
              Перейти в корзину
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onContinueEvent}
            >
              Продолжить покупки
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
