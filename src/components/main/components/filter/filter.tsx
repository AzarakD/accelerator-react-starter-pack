import {
  useEffect,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { useDebounce } from '../../../../hooks/use-debounce';
import { changeFilter } from '../../../../store/actions';
import { createAPI } from '../../../../services/api';
import {
  checkGuitarType,
  getPriceFromUrl
} from '../../../../utils';
import {
  FilterQuery,
  PlaceholderQuery,
  QueryKey
} from '../../../../const';
import { Guitar } from '../../../../types/guitar';

const MIN_PRICE = 0;

const api = createAPI();
const getPlaceholderInfo = async () => {
  const minPriceCard = await api.get<Guitar[]>(PlaceholderQuery.Min);
  const maxPriceCard = await api.get<Guitar[]>(PlaceholderQuery.Max);

  return {
    minPrice: minPriceCard.data[0].price,
    maxPrice: maxPriceCard.data[0].price,
  };
};

export default function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const locationSearch = history.location.search;
  const priceMin = getPriceFromUrl(locationSearch, QueryKey.PriceMax);
  const priceMax = getPriceFromUrl(locationSearch, QueryKey.PriceMin);

  const [isGuitarTypeChecked, setIsGuitarTypeChecked] = useState(checkGuitarType(locationSearch));
  const [placeholder, setPlaceholder] = useState({
    min: MIN_PRICE,
    max: MIN_PRICE,
  });
  const [price, setPrice] = useState({
    min: priceMin,
    max: priceMax,
  });
  const [guitarType, setGuitarType] = useState(
    {
      acoustic: locationSearch.includes(FilterQuery.Acoustic),
      electric: locationSearch.includes(FilterQuery.Electric),
      ukulele: locationSearch.includes(FilterQuery.Ukulele),
    },
  );
  const [stringCount, setStringCount] = useState({
    four: locationSearch.includes(FilterQuery.FourString),
    six: locationSearch.includes(FilterQuery.SixString),
    seven: locationSearch.includes(FilterQuery.SevenString),
    twelve: locationSearch.includes(FilterQuery.TwelveString),
  });

  const debouncedMin = useDebounce(price.min);
  const debouncedMax = useDebounce(price.max);

  useDidMountEffect(() => {
    getPlaceholderInfo().then((value) => {
      setPlaceholder({
        min: value.minPrice,
        max: value.maxPrice,
      });
    });
  });

  useEffect(() => {
    const query = `${
      guitarType.acoustic ? FilterQuery.Acoustic : ''
    }${
      guitarType.electric ? FilterQuery.Electric : ''
    }${
      guitarType.ukulele ? FilterQuery.Ukulele : ''
    }${
      stringCount.four ? FilterQuery.FourString : ''
    }${
      stringCount.six ? FilterQuery.SixString : ''
    }${
      stringCount.seven ? FilterQuery.SevenString : ''
    }${
      stringCount.twelve ? FilterQuery.TwelveString : ''
    }${
      debouncedMin !== '' ? `&${QueryKey.PriceMin}${debouncedMin}` : ''
    }${
      debouncedMax !== '' ? `&${QueryKey.PriceMax}${debouncedMax}` : ''
    }`;

    dispatch(changeFilter(query));
    setIsGuitarTypeChecked(checkGuitarType(query));
  }, [
    dispatch,
    guitarType.acoustic,
    guitarType.electric,
    guitarType.ukulele,
    stringCount.four,
    stringCount.seven,
    stringCount.six,
    stringCount.twelve,
    debouncedMin,
    debouncedMax,
  ]);

  const onPriceMinBlur = () => {
    let min = Math.trunc(Math.abs(+price.min));

    if (min < placeholder.min) {
      min = placeholder.min;
    }
    setPrice({...price, min: `${min}`});
  };

  const onPriceMaxBlur = () => {
    let max = Math.trunc(Math.abs(+price.max));

    if (max > placeholder.max || max === 0) {
      max = placeholder.max;
    }
    setPrice({...price, max: `${max}`});
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              onChange={(evt) => setPrice({...price, min: (Math.abs(+evt.currentTarget.value)).toFixed(0)})}
              type="number"
              placeholder={`${placeholder.min}`}
              id="priceMin"
              name="от"
              value={price.min}
              onBlur={onPriceMinBlur}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onInput={(evt) => setPrice({...price, max: (Math.abs(+evt.currentTarget.value)).toFixed(0)})}
              type="number"
              placeholder={`${placeholder.max}`}
              id="priceMax"
              name="до"
              value={price.max}
              onBlur={onPriceMaxBlur}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setGuitarType({...guitarType, acoustic: !guitarType.acoustic});
              if (!guitarType.acoustic) {
                setStringCount({...stringCount, four: false});
              }
            }}
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={guitarType.acoustic}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setGuitarType({...guitarType, electric: !guitarType.electric});
              if (!guitarType.electric) {
                setStringCount({...stringCount, twelve: false});
              }
            }}
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={guitarType.electric}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => {
              setGuitarType({...guitarType, ukulele: !guitarType.ukulele});
              if (!guitarType.ukulele) {
                setStringCount({...stringCount, six: false, seven: false, twelve: false});
              }
            }}
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={guitarType.ukulele}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => setStringCount({...stringCount, four: !stringCount.four})}
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            checked={stringCount.four}
            disabled={!guitarType.ukulele && !guitarType.electric && isGuitarTypeChecked}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => setStringCount({...stringCount, six: !stringCount.six})}
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            checked={stringCount.six}
            disabled={!guitarType.acoustic && !guitarType.electric && isGuitarTypeChecked}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => setStringCount({...stringCount, seven: !stringCount.seven})}
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            checked={stringCount.seven}
            disabled={!guitarType.acoustic && !guitarType.electric && isGuitarTypeChecked}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => setStringCount({...stringCount, twelve: !stringCount.twelve})}
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            checked={stringCount.twelve}
            disabled={!guitarType.acoustic && isGuitarTypeChecked}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}
