import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../../../store/selectors';

export default function FormSearch(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [guitarNames, setGuitarNames] = useState<string[]>([]);
  const [shownNames, setShownNames] = useState<string[]>([]);

  const guitars = useSelector(getGuitars);
  const refInput = useRef(null);

  useEffect(
    () => setGuitarNames(Array.from(guitars, (guitar) => guitar.name)),
    [guitars],
  );

  const filterNames = (evt: FormEvent<HTMLInputElement>) => {
    if (!isOpened) {setIsOpened(true);}

    const currentInput = evt.currentTarget.value.toLowerCase();

    setShownNames(guitarNames.filter(
      (name) => name
        .toLowerCase()
        .includes(currentInput),
    ));
  };

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
          onInput={(evt) => filterNames(evt)}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul
        style={{ zIndex: '1' }}
        className={`form-search__select-list ${isOpened ? 'list-opened' : 'hidden'}`}
      >
        {
          shownNames.map((name) =>
            <li key={name} className="form-search__select-item" tabIndex={0}>{name}</li>)
        }
      </ul>
    </div>
  );
}
