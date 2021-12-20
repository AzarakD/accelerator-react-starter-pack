import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../../../store/selectors';
import SelectList from './select-list/select-list';

export default function FormSearch(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [guitarItems, setGuitarItems] = useState<Array<[string, number]>>([]);
  const [shownItems, setShownItems] = useState<Array<[string, number]>>([]);

  const guitars = useSelector(getGuitars);
  const refInput = useRef(null);

  useEffect(
    () => setGuitarItems(Array.from(guitars, (guitar) => [guitar.name, guitar.id])),
    [guitars],
  );

  const onUserInput = useCallback((evt: FormEvent<HTMLInputElement>) => {
    const currentInput = evt.currentTarget.value.toLowerCase();
    const filteredNames = guitarItems.filter(
      (item) => item[0]
        .toLowerCase()
        .includes(currentInput),
    );

    setShownItems(filteredNames);

    if (filteredNames.length !== 0 && !isOpened) {setIsOpened(true);}
    if (filteredNames.length === 0 || currentInput === '') {setIsOpened(false);}
  }, [guitarItems, isOpened]);

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

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          ref={refInput}
          onInput={(evt) => onUserInput(evt)}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <SelectList isOpened={isOpened} shownItems={shownItems} />
    </div>
  );
}
