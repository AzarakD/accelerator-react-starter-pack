import {
  useEffect,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update';
import { changeSorting } from '../../../../store/actions';
import {
  getFormReset,
  getSorting
} from '../../../../store/selectors';
import {
  QueryKey,
  SortQuery
} from '../../../../const';

export default function Sort(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const formReset = useSelector(getFormReset);
  const sorting = useSelector(getSorting);

  const locationSearch = history.location.search;

  const [sortMethods, setSortMethods] = useState({
    price: locationSearch.includes(QueryKey.SortPrice),
    rating: locationSearch.includes(QueryKey.SortRating),
  });
  const [sortArrows, setSortArrows] = useState({
    toBigger: locationSearch.includes(QueryKey.OrderAsc),
    toLesser: locationSearch.includes(QueryKey.OrderDesc),
  });

  useDidUpdateEffect(() => {
    setSortMethods({
      price: false,
      rating: false,
    });
    setSortArrows({
      toBigger: false,
      toLesser: false,
    });
    dispatch(changeSorting(SortQuery.Default));
  }, [dispatch, formReset]);

  useEffect(() => {
    let sortQuery = '';

    if (sortMethods.price && sortArrows.toBigger) {
      sortQuery = SortQuery.SortToBiggerPrice;
    } else if (sortMethods.price && sortArrows.toLesser) {
      sortQuery = SortQuery.SortToLesserPrice;
    } else if (sortMethods.rating && sortArrows.toBigger) {
      sortQuery = SortQuery.SortToBiggerRating;
    } else if (sortMethods.rating && sortArrows.toLesser) {
      sortQuery = SortQuery.SortToLesserRating;
    }

    if (sorting !== sortQuery) {
      dispatch(changeSorting(sortQuery));
    }
  }, [
    dispatch,
    sorting,
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
