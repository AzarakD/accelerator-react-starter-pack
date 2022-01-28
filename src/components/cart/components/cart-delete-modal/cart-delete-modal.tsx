import {
  useCallback,
  useEffect
} from 'react';

import { useDispatch } from 'react-redux';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { removeFromCart } from '../../../../store/actions';
import {
  setGuitarType,
  setPrice
} from '../../../../utils';
import { CartDeleteModalProps } from './type';

export default function CartDeleteModal({guitar, closeModal}: CartDeleteModalProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    id,
    name,
    vendorCode,
    type,
    previewImg,
    stringCount,
    price,
  } = guitar;

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

  const onRemoveEvent = () => {
    dispatch(removeFromCart(id));
    onCloseModalEvent();
  };

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyDown);

    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown]);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onCloseModalEvent} data-close-modal></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img
              className="modal__img"
              src={`/${previewImg.replace('/', '/content/')}`}
              width="67"
              height="137"
              alt={name}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
              <p className="modal__product-params">{setGuitarType(type)}, {stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{setPrice(price)}</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={onRemoveEvent}
            >
              Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onCloseModalEvent}
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
