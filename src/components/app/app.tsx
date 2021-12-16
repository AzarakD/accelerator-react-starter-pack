import Icons from '../common/icons/icons';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';

export default function App(): JSX.Element {
  return (
    <>
      <Icons />

      <div className="wrapper">
        <Header />

        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="#todo">Каталог</a>
              </li>
            </ul>
            <div className="catalog">
              <form className="catalog-filter">
                <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Цена, ₽</legend>
                  <div className="catalog-filter__price-range">
                    <div className="form-input">
                      <label className="visually-hidden">Минимальная цена</label>
                      <input type="number" placeholder="1 000" id="priceMin" name="от"/>
                    </div>
                    <div className="form-input">
                      <label className="visually-hidden">Максимальная цена</label>
                      <input type="number" placeholder="30 000" id="priceMax" name="до"/>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Тип гитар</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
                    <label htmlFor="acoustic">Акустические гитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked/>
                    <label htmlFor="electric">Электрогитары</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked/>
                    <label htmlFor="ukulele">Укулеле</label>
                  </div>
                </fieldset>
                <fieldset className="catalog-filter__block">
                  <legend className="catalog-filter__block-title">Количество струн</legend>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked/>
                    <label htmlFor="4-strings">4</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked/>
                    <label htmlFor="6-strings">6</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
                    <label htmlFor="7-strings">7</label>
                  </div>
                  <div className="form-checkbox catalog-filter__block-item">
                    <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
                    <label htmlFor="12-strings">12</label>
                  </div>
                </fieldset>
              </form>
              <div className="catalog-sort">
                <h2 className="catalog-sort__title">Сортировать:</h2>
                <div className="catalog-sort__type">
                  <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1}>по цене</button>
                  <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
                </div>
                <div className="catalog-sort__order">
                  <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1}></button>
                  <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
                </div>
              </div>
              <div className="cards catalog__cards">
                <div className="product-card"><img src="img/content/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-1.jpg" width="75" height="190" alt="Честер Bass"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">Честер Bass</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red-border button--mini button--in-cart" href="#todo">В Корзине</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-2.jpg" width="75" height="190" alt="СURT Z30 Plus"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">76</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-3.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-4.jpg" width="75" height="190" alt="СURT Z30 Plus"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">76</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-5.jpg" width="75" height="190" alt="Честер Bass"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">Честер Bass</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>51 100 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red-border button--mini button--in-cart" href="#todo">В Корзине</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-6.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-7.jpg" width="75" height="190" alt="СURT Z30 Plus Acoustics"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">9</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus Acoustics</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>129 500 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
                <div className="product-card"><img src="img/content/guitar-8.jpg" width="75" height="190" alt="СURT Z30 Plus"/>
                  <div className="product-card__info">
                    <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="12" height="11" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="rate__count">76</span><span className="rate__message"></span>
                    </div>
                    <p className="product-card__title">СURT Z30 Plus</p>
                    <p className="product-card__price"><span className="visually-hidden">Цена:</span>9 700 ₽
                    </p>
                  </div>
                  <div className="product-card__buttons"><a className="button button--mini" href="#todo">Подробнее</a><a className="button button--red button--mini button--add-to-cart" href="#todo">Купить</a>
                  </div>
                </div>
              </div>
              <div className="pagination page-content__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                  </li>
                  <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
