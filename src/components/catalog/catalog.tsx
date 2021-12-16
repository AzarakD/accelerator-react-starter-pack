import Breadcrumbs from './components/breadcrumbs/breadcrumbs';
import Cards from './components/cards/cards';
import Filter from './components/filter/filter';
import Pagination from './components/pagination/pagination';
import Sort from './components/sort/sort';

export default function Catalog(): JSX.Element {
  return (
    <div className="catalog">
      <Breadcrumbs />
      <Filter />
      <Sort />
      <Cards />
      <Pagination />
    </div>
  );
}
