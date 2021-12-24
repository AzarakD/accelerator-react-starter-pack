/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update-effect';
import { useDidMountEffect } from '../../../../hooks/use-did-mount-effect';
import { createAPI } from '../../../../services/api';
import { filterGuitarsAction } from '../../../../store/api-actioms';
import { FilterQuery } from '../../../../const';
import { GuitarFilterType } from '../../../../types/filter';
import { Guitar } from '../../../../types/guitar';

const MIN_PRICE = 0;

const api = createAPI();
const getInfo = async () => {
  const { data } = await api.get<Guitar[]>('/guitars?_sort=price&_order=asc');
  return data;
};

export default function Filter(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();

  const [locationSearch] = useState(history.location.search);

  const [placeholder, setPlaceholder] = useState({
    min: MIN_PRICE,
    max: MIN_PRICE,
  });
  const [price, setPrice] = useState({
    min: '',
    max: '',
    query: '',
  });
  const [guitarType, setGuitarType] = useState<GuitarFilterType>(
    {
      acoustic: locationSearch.includes(FilterQuery.Acoustic),
      electric: locationSearch.includes(FilterQuery.Electric),
      ukulele: locationSearch.includes(FilterQuery.Ukulele),
    },
  );

  useDidMountEffect(() => {
    getInfo().then((value) => {
      setPlaceholder({
        min: value[0].price,
        max: value[value.length - 1].price,
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
    }${price.query}`;

    dispatch(filterGuitarsAction(query));
    history.push(`?${query}`);
  }, [dispatch, guitarType.acoustic, guitarType.electric, guitarType.ukulele, history, price.query]);

  const onPriceMinBlur = () => {
    let min = Math.trunc(Math.abs(+price.min));
    const max = Math.trunc(Math.abs(+price.max));

    if (min < placeholder.min) {
      min = placeholder.min;
    }

    if (price.min !== '' && (max > min)) {
      setPrice({min: `${min}`, max: `${max}`, query: `&price_gte=${min}&price_lte=${max}`});
      return;
    }
    setPrice({...price, min: `${min}`});
  };

  const onPriceMaxBlur = () => {
    const min = Math.trunc(Math.abs(+price.min));
    let max = Math.trunc(Math.abs(+price.max));

    if (max > placeholder.max) {
      max = placeholder.max;
    }

    if (price.min !== '' && (max > min)) {
      setPrice({min: `${min}`, max: `${max}`, query: `&price_gte=${min}&price_lte=${max}`});
      return;
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
              onInput={(evt) => setPrice({...price, min: evt.currentTarget.value})}
              type="number"
              placeholder={`${placeholder.min}`}
              id="priceMin"
              name="от"
              value={price.min}
              // onBlur={(evt) => onPriceBlur(evt.target.id, price.min)}
              onBlur={onPriceMinBlur}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              onInput={(evt) => setPrice({...price, max: evt.currentTarget.value})}
              type="number"
              placeholder={`${placeholder.max}`}
              id="priceMax"
              name="до"
              value={price.max}
              // onBlur={(evt) => onPriceBlur(evt.target.id, price.max)}
              onBlur={onPriceMaxBlur}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={() => setGuitarType({...guitarType, acoustic: !guitarType.acoustic})}
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
            onChange={() => setGuitarType({...guitarType, electric: !guitarType.electric})}
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
            onChange={() => setGuitarType({...guitarType, ukulele: !guitarType.ukulele})}
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
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}
