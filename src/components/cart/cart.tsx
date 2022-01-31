import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCart,
  getDiscount
} from '../../store/cart/selectors';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';
import Icons from '../common/icons/icons';
import CartItem from './components/cart-item/cart-item';
import Coupon from './components/coupon/coupon';
import { setPrice } from '../../utils';
import { AppRoute } from '../../const';

const PERCENT = 100;

export default function Cart(): JSX.Element {
  const discount = useSelector(getDiscount);
  const cart = useSelector(getCart);

  const totalPrice = cart.reduce((sum, {item}) => sum + item.price, 0);
  const totalCount = cart.reduce((sum, {count}) => sum + count, 0);

  const totalValue = totalPrice * totalCount;
  const discountValue = discount / PERCENT * totalValue;
  const paymentValue = totalValue - discountValue;

  return (
    <>
      <Icons />
      <div className="wrapper">
        <Header />
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Main} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={'#'} className="link">Корзина</Link>
              </li>
            </ul>
            <div className="cart">
              {
                !cart?.length
                  ? <>Корзина пуста</>
                  : cart.map((item) => <CartItem key={item.id} guitar={item.item} />)
              }
              <div className="cart__footer">
                <Coupon />

                <div className="cart__total-info">
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">Всего:</span>
                    <span className="cart__total-value">
                      {setPrice(totalValue)}
                    </span>
                  </p>
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">Скидка:</span>
                    <span className="cart__total-value cart__total-value--bonus">
                      {discount ? '-' : ''} {setPrice(discountValue)}
                    </span>
                  </p>
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">К оплате:</span>
                    <span className="cart__total-value cart__total-value--payment">
                      {setPrice(paymentValue)}
                    </span>
                  </p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
