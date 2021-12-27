import {
  useEffect,
  useRef
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { fetchGuitarsAction } from '../../../../store/api-actioms';
import {
  getFilter,
  getIsDataLoaded,
  getSorting
} from '../../../../store/selectors';
import Cards from '../cards/cards';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sort from '../sort/sort';

export default function Catalog(): JSX.Element {
  const isLoaded = useSelector(getIsDataLoaded);
  const sorting = useSelector(getSorting);
  const filter = useSelector(getFilter);

  const history = useHistory();
  const dispatch = useDispatch();

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current && (history.location.search !== `?${filter}${sorting}`)) {
      const query = `?${filter}${sorting}`;

      dispatch(fetchGuitarsAction(query));
      history.push(query);
    }
  }, [dispatch, filter, history, sorting]);

  useDidMountEffect(() => {
    isMountedRef.current = true;
    dispatch(fetchGuitarsAction(history.location.search));
  });

  if (!isLoaded) {
    return <>Loading...</>;
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
