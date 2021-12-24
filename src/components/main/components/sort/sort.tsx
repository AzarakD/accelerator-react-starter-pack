import {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  getFilter,
  getSortMethod
} from '../../../../store/selectors';
import { sortGuitarsAction } from '../../../../store/api-actioms';
import {
  SortMethods,
  SortQuery
} from '../../../../const';

export default function Sort(): JSX.Element {
  const [sortMethods, setSortMethods] = useState({
    price: false,
    rating: false,
  });
  const [sortArrows, setSortArrows] = useState({
    toBigger: false,
    toLesser: false,
  });

  const dispatch = useDispatch();
  const sortMethod = useSelector(getSortMethod);
  const filter = useSelector(getFilter);

  useEffect(() => {
    if (sortMethod === SortMethods.Default) {
      setSortMethods({price: false, rating: false});
      setSortArrows({toBigger: false, toLesser: false});
    }
  }, [sortMethod]);

  const sortGuitars = (query: string) => {
    dispatch(sortGuitarsAction(`${filter}${query}`, query));
  };

  const onPriceButtonClick = () => {
    setSortMethods({price: true, rating: false});

    if (!sortArrows.toBigger && !sortArrows.toLesser) {
      setSortArrows({toBigger: true, toLesser: false});
    }

    !sortArrows.toLesser
      ? sortGuitars(SortQuery.SortToBiggerPrice)
      : sortGuitars(SortQuery.SortToLesserPrice);
  };

  const onRatingButtonClick = () => {
    setSortMethods({price: false, rating: true});

    if (!sortArrows.toBigger && !sortArrows.toLesser) {
      setSortArrows({toBigger: true, toLesser: false});
    }

    !sortArrows.toLesser
      ? sortGuitars(SortQuery.SortToBiggerRating)
      : sortGuitars(SortQuery.SortToLesserRating);
  };

  const onUpArrowClick = () => {
    setSortArrows({toBigger: true, toLesser: false});

    if (sortMethods.rating) {
      sortGuitars(SortQuery.SortToBiggerRating);
      return;
    }
    if (!sortMethods.price) {
      setSortMethods({price: true, rating: false});
    }
    sortGuitars(SortQuery.SortToBiggerPrice);
  };

  const onDownArrowClick = () => {
    setSortArrows({toBigger: false, toLesser: true});

    if (sortMethods.rating) {
      sortGuitars(SortQuery.SortToLesserRating);
      return;
    }
    if (!sortMethods.price) {
      setSortMethods({price: true, rating: false});
    }
    sortGuitars(SortQuery.SortToLesserPrice);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={onPriceButtonClick}
          className={`catalog-sort__type-button ${sortMethods.price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
        >
          по цене
        </button>
        <button
          onClick={onRatingButtonClick}
          className={`catalog-sort__type-button ${sortMethods.rating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={onUpArrowClick}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortArrows.toBigger ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
        >
        </button>
        <button
          onClick={onDownArrowClick}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortArrows.toLesser ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
        >
        </button>
      </div>
    </div>
  );
}
