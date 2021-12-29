import {
  memo,
  useRef,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update';
import { setCurrentPage } from '../../../../store/actions';
import {
  getCurrentPage,
  getFilter,
  getTotalCount
} from '../../../../store/selectors';
import {
  getPageFromUrl,
  getPages,
  getShownPages
} from '../../../../utils';
import { ITEM_COUNT } from '../../../../const';

function Pagination(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();

  const filter = useSelector(getFilter);
  const currentPage = useSelector(getCurrentPage);
  const totalCount = useSelector(getTotalCount);

  const filterRef = useRef(filter);
  const pageCount = Math.ceil(totalCount / ITEM_COUNT);


  const [pages, setPages] = useState<number[]>(getPages(pageCount));
  const [shownPages, setShownPages] = useState<number[]>(getShownPages(pages, currentPage));

  useDidUpdateEffect(() => {
    if (filterRef.current === filter) {
      setShownPages(getShownPages(pages, currentPage));
    }
  }, [currentPage]);

  useDidUpdateEffect(() => {
    const updatedPages = getPages(pageCount);

    setPages(updatedPages);
    setShownPages(getShownPages(updatedPages, currentPage));

    filterRef.current = filter;
  }, [pageCount]);

  useDidMountEffect(() => {
    const pageFromSearch = getPageFromUrl(history.location.search);

    if (pageFromSearch && currentPage !== pageFromSearch) {
      dispatch(setCurrentPage(pageFromSearch));
    }
  });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          currentPage > 1
            ? (
              <li
                className="pagination__page pagination__page--prev"
                id="prev"
                onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              >
                <a className="link pagination__page-link" href="#prev">Назад</a>
              </li>
            )
            : ''
        }
        {
          shownPages.map((page) =>
            (
              <li
                className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
              >
                <a className="link pagination__page-link" href={`#page${page}`}>{page}</a>
              </li>
            ),
          )
        }
        {
          currentPage < pageCount
            ? (
              <li
                className="pagination__page pagination__page--next"
                id="next"
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
              >
                <a className="link pagination__page-link" href="#next">Далее</a>
              </li>
            )
            : ''
        }
      </ul>
    </div>
  );
}

export default memo(Pagination);
