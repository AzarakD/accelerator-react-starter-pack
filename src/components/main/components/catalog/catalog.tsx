import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update';
import { useState } from 'react';
import { fetchGuitarsAction } from '../../../../store/api-actioms';
import {
  getCurrentPage,
  getFilter,
  getSearch,
  getSorting
} from '../../../../store/selectors';
import Cards from '../cards/cards';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sort from '../sort/sort';
import { QueryKey } from '../../../../const';
import { ThunkAppDispatch } from '../../../../types/actions';

export default function Catalog(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const sorting = useSelector(getSorting);
  const filter = useSelector(getFilter);
  const search = useSelector(getSearch);
  const page = useSelector(getCurrentPage);

  const history = useHistory();
  const dispatch = useDispatch<ThunkAppDispatch>();

  useDidUpdateEffect(() => {
    const query = `?${QueryKey.Page}${page}${search}${filter}${sorting}`;

    if (history.location.search !== query) {
      dispatch(fetchGuitarsAction(query));
      history.push(query);
    }
  }, [
    dispatch,
    filter,
    history,
    search,
    sorting,
    page,
  ]);

  useDidMountEffect(() => {
    dispatch(fetchGuitarsAction(history.location.search))
      .then(() => setIsLoaded(true))
      .catch(() => setIsFailed(true));
  });

  if (!isLoaded && !isFailed) {
    return <>Загрузка...</>;
  }

  if (isFailed) {
    return <>Сервер временно недоступен. Попробуйте позже.</>;
  }

  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <Cards />
      <Pagination />
    </div>
  );
}
