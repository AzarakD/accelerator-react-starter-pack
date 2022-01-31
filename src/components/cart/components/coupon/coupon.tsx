import {
  FormEvent,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import { sendCouponAction } from '../../../../store/api-actioms';
import { ThunkAppDispatch } from '../../../../types/actions';

const validateCoupon = (coupon: string) => !coupon.includes(' ');

export default function Coupon(): JSX.Element {
  const [isCouponValid, setIsCouponValid] = useState<boolean>(true);
  const [isCouponAccepted, setIsCouponAccepted] = useState<boolean>(false);
  const [userInput, setUserInput] = useState('');

  const dispatch = useDispatch<ThunkAppDispatch>();

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (validateCoupon(userInput)) {
      setIsCouponValid(true);
      dispatch(sendCouponAction({coupon: userInput}))
        .then(() => {
          setIsCouponValid(true);
          setIsCouponAccepted(true);
        })
        .catch(() => {
          setIsCouponValid(false);
          setIsCouponAccepted(false);
        });

      return;
    }
    setIsCouponValid(false);
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        className="coupon__form"
        id="coupon-form"
        onSubmit={onSubmit}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            onInput={(evt) => setUserInput(evt.currentTarget.value)}
            value={userInput}
          />
          {
            isCouponAccepted
              ? <p className="form-input__message form-input__message--success">Промокод принят</p>
              : ''
          }
          {
            !isCouponValid
              ? <p className="form-input__message form-input__message--error">Неверный промокод</p>
              : ''
          }
        </div>
        <button
          className="button button--big coupon__button"
          type='submit'
        >
          Применить
        </button>
      </form>
    </div>
  );
}
