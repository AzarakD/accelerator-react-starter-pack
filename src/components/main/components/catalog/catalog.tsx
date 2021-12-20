import { useSelector } from 'react-redux';
import { getIsDataLoaded } from '../../../../store/selectors';
import Cards from '../cards/cards';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sort from '../sort/sort';

export default function Catalog(): JSX.Element {
  const isLoaded = useSelector(getIsDataLoaded);

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
