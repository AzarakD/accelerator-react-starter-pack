import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { setCurrentPage } from '../../../../store/actions';
import { getCurrentPage } from '../../../../store/selectors';
import { getPageFromUrl } from '../../../../utils';

const pages = [1, 2, 3];

export default function Pagination(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);

  const pageFromSearch = +getPageFromUrl(history.location.search);

  useDidMountEffect(() => {
    if (pageFromSearch && currentPage !== pageFromSearch) {
      dispatch(setCurrentPage(pageFromSearch));
    }
  });

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          pages.map((page) =>
            (
              <li
                className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
              >
                <a className="link pagination__page-link" href='#/'>{page}</a>
              </li>
            ),
          )
        }
        <li className="pagination__page pagination__page--next" id="next">
          <a className="link pagination__page-link" href="2">Далее</a>
        </li>
      </ul>
    </div>
  );
}
