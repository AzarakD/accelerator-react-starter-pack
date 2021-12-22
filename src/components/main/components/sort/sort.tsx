import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortGuitars } from '../../../../store/actions';
import { SortMethods } from '../../../../const';

export default function Sort(): JSX.Element {
  const [sortMethods, setSortMethods] = useState([false, false]);
  const [sortArrows, setSortArrows] = useState([false, false]);

  const dispatch = useDispatch();

  const onPriceButtonClick = () => {
    setSortMethods([true, false]);

    if (!sortArrows[0] && !sortArrows[1]) {setSortArrows([true, false]);}

    !sortArrows[1]
      ? dispatch(sortGuitars(SortMethods.SortToBiggerPrice))
      : dispatch(sortGuitars(SortMethods.SortToLesserPrice));
  };

  const onRatingButtonClick = () => {
    setSortMethods([false, true]);

    if (!sortArrows[0] && !sortArrows[1]) {setSortArrows([true, false]);}

    !sortArrows[1]
      ? dispatch(sortGuitars(SortMethods.SortToBiggerRating))
      : dispatch(sortGuitars(SortMethods.SortToLesserRating));
  };

  const onUpArrowClick = () => {
    setSortArrows([true, false]);

    if (sortMethods[1]) {
      dispatch(sortGuitars(SortMethods.SortToBiggerRating));
      return;
    }
    if (!sortMethods[0]) {setSortMethods([true, false]);}
    dispatch(sortGuitars(SortMethods.SortToBiggerPrice));
  };

  const onDownArrowClick = () => {
    setSortArrows([false, true]);

    if (sortMethods[1]) {
      dispatch(sortGuitars(SortMethods.SortToLesserRating));
      return;
    }
    if (!sortMethods[0]) {setSortMethods([true, false]);}
    dispatch(sortGuitars(SortMethods.SortToLesserPrice));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={onPriceButtonClick}
          className={`catalog-sort__type-button ${sortMethods[0] ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
        >
          по цене
        </button>
        <button
          onClick={onRatingButtonClick}
          className={`catalog-sort__type-button ${sortMethods[1] ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={onUpArrowClick}
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortArrows[0] ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
        >
        </button>
        <button
          onClick={onDownArrowClick}
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortArrows[1] ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
        >
        </button>
      </div>
    </div>
  );
}
