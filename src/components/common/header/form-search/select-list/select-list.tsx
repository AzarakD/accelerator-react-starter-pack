import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../../../const';
import { SelectListProps } from './type';

export default function SelectList({isOpened, shownItems}: SelectListProps): JSX.Element {
  const history = useHistory();

  return (
    <ul
      style={{ zIndex: '1' }}
      className={`form-search__select-list ${isOpened ? 'list-opened' : 'hidden'}`}
    >
      {
        shownItems.map((item) =>
          (
            <li
              onClick={() => history.push(AppRoute.Product.replace(':id', String(item[1])))}
              onKeyPress={(evt) => {
                if (evt.key === 'Enter') {
                  history.push(AppRoute.Product.replace(':id', String(item[1])));
                }
              }}
              key={item[1]}
              className="form-search__select-item"
              tabIndex={0}
            >
              {item[0]}
            </li>
          ),
        )
      }
    </ul>
  );
}
