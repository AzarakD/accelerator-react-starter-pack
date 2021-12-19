import Cards from '../cards/cards';
import Filter from '../filter/filter';
import Pagination from '../pagination/pagination';
import Sort from '../sort/sort';

export default function Catalog(): JSX.Element {
  return (
    <div className="catalog">
      <Filter />
      <Sort />
      <Cards />
      <Pagination />
    </div>
  );
}
