import {
  useEffect,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeSorting } from '../../../../store/actions';
import {
  QueryKey,
  SortQuery
} from '../../../../const';

export default function Sort(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const locationSearch = history.location.search;

  const [sortMethods, setSortMethods] = useState({
    price: locationSearch.includes(QueryKey.SortPrice),
    rating: locationSearch.includes(QueryKey.SortRating),
  });
  const [sortArrows, setSortArrows] = useState({
    toBigger: locationSearch.includes(QueryKey.OrderAsc),
    toLesser: locationSearch.includes(QueryKey.OrderDesc),
  });

  useEffect(() => {
    let sort = '';

    if (sortMethods.price && sortArrows.toBigger) {
      sort = SortQuery.SortToBiggerPrice;
    } else if (sortMethods.price && sortArrows.toLesser) {
      sort = SortQuery.SortToLesserPrice;
    } else if (sortMethods.rating && sortArrows.toBigger) {
      sort = SortQuery.SortToBiggerRating;
    } else if (sortMethods.rating && sortArrows.toLesser) {
      sort = SortQuery.SortToLesserRating;
    }

    dispatch(changeSorting(sort));
  }, [
    dispatch,
    sortArrows.toBigger,
    sortArrows.toLesser,
    sortMethods.price,
    sortMethods.rating,
  ]);

  const onPriceButtonClick = () => {
    setSortMethods({price: true, rating: false});

    if (!sortArrows.toBigger && !sortArrows.toLesser) {
      setSortArrows({toBigger: true, toLesser: false});
    }
  };

  const onRatingButtonClick = () => {
    setSortMethods({price: false, rating: true});

    if (!sortArrows.toBigger && !sortArrows.toLesser) {
      setSortArrows({toBigger: true, toLesser: false});
    }
  };

  const onUpArrowClick = () => {
    setSortArrows({toBigger: true, toLesser: false});

    if (!sortMethods.price) {
      setSortMethods({price: true, rating: false});
    }
  };

  const onDownArrowClick = () => {
    setSortArrows({toBigger: false, toLesser: true});

    if (!sortMethods.price) {
      setSortMethods({price: true, rating: false});
    }
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
