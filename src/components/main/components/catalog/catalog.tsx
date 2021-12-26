import { useEffect } from 'react';
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

  const history = useHistory();
  const dispatch = useDispatch();

  const sortMethod = useSelector(getSorting);
  const filter = useSelector(getFilter);

  useDidMountEffect(() => {
    dispatch(fetchGuitarsAction(history.location.search));
  });

  useEffect(() => {
    if (isLoaded && (history.location.search !== `?${filter}${sortMethod}`)) {
      const query = `?${filter}${sortMethod}`;

      dispatch(fetchGuitarsAction(query));
      history.push(query);
    }
  }, [dispatch, filter, history, sortMethod]);

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
