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
import { useHistory } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/use-debounce';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update';
import { createAPI } from '../../../../services/api';
import {
  changeSearch,
  resetForm
} from '../../../../store/actions';
import {
  getFormReset,
  getIsDataLoaded
} from '../../../../store/selectors';
import SelectList from './select-list/select-list';
import { getSearchFromUrl } from '../../../../utils';
import {
  APIRoute,
  SearchQuery
} from '../../../../const';
import { Guitar } from '../../../../types/guitar';

const INPUT_DELAY = 500;

const api = createAPI();
const getSimilarGuitars = async (query: string) => {
  const route = APIRoute.Guitars.replace(':query', `?${SearchQuery.Similar}${query}`);
  try {
    const { data } = await api.get<Guitar[]>(route);
    return data;

  } catch {
    // eslint-disable-next-line no-console
    console.log('search is not available');
    return [];
  }
};

export default function FormSearch(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoaded = useSelector(getIsDataLoaded);
  const formReset = useSelector(getFormReset);
  const search = getSearchFromUrl(history.location.search);

  const [userInput, setUserInput] = useState(search);
  const [isOpened, setIsOpened] = useState(false);
  const [shownGuitars, setShownGuitars] = useState<Guitar[]>([]);

  const refInput = useRef(null);
  const debouncedInput = useDebounce(userInput, INPUT_DELAY);

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

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(resetForm());
  };

  useDidUpdateEffect(() => {
    userInput
      ? dispatch(changeSearch(`${SearchQuery.Similar}${userInput}`))
      : dispatch(changeSearch(SearchQuery.Default));
  }, [dispatch, formReset]);

  useDidUpdateEffect(() => {
    if (debouncedInput) {
      getSimilarGuitars(debouncedInput).then((value) => {
        setShownGuitars(value);
      });
      return;
    }
    setShownGuitars([]);
  }, [debouncedInput]);

  useDidUpdateEffect(() => {
    if (shownGuitars.length !== 0) {setIsOpened(true);}
    if (shownGuitars.length === 0) {setIsOpened(false);}
  }, [shownGuitars]);

  useEffect(() => {
    document.addEventListener('click', onOutsideClick);
    document.addEventListener('keydown', onEscKeyDown);

    return () => {
      document.removeEventListener('keydown', onEscKeyDown);
      document.removeEventListener('click', onOutsideClick);
    };
  }, [onEscKeyDown, onOutsideClick]);

  useEffect(() => {
    if (isLoaded && search) {
      dispatch(changeSearch(`${SearchQuery.Similar}${search}`));
    }
  }, [dispatch, isLoaded, search]);

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
