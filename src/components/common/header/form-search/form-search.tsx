import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { displayGuitars, sortGuitars } from '../../../../store/actions';
import { getGuitars } from '../../../../store/selectors';
import SelectList from './select-list/select-list';
import { filterByName } from '../../../../utils';
import { Guitar } from '../../../../types/guitar';
import { SortMethods } from '../../../../const';

export default function FormSearch(): JSX.Element {
  const [userInput, setUserInput] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [shownGuitars, setShownGuitars] = useState<Guitar[]>([]);

  const dispatch = useDispatch();
  const guitars = useSelector(getGuitars);
  const refInput = useRef(null);

  const checkIsOpened = useCallback((filteredItems: Guitar[]) => {
    if (filteredItems.length !== 0) {setIsOpened(true);}
    if (filteredItems.length === 0 || userInput === '') {setIsOpened(false);}
  }, [userInput]);

  useEffect(() => {
    const filteredGuitars = filterByName(guitars, userInput);

    setShownGuitars(filteredGuitars);
    checkIsOpened(filteredGuitars);
  }, [checkIsOpened, guitars, userInput]);

  const onOutsideClick = useCallback((evt) => {
    if (refInput.current !== evt.target) {
      setIsOpened(false);
    }
  }, []);

  const onEscKeyDown = useCallback((evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      setIsOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onEscKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscKeyDown);
      document.removeEventListener('click', onOutsideClick);
    };
  }, [onEscKeyDown, onOutsideClick]);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const filteredGuitars = filterByName(guitars, userInput);

    dispatch(sortGuitars(SortMethods.Default));
    dispatch(displayGuitars(filteredGuitars));
  };

  return (
    <div className="form-search" onSubmit={onSubmit}>
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          ref={refInput}
          onInput={(evt) => setUserInput(evt.currentTarget.value.toLowerCase())}
          value={userInput}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <SelectList isOpened={isOpened} shownItems={shownGuitars} />
    </div>
  );
}
