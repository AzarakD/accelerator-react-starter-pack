import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDidUpdateEffect } from '../../../../hooks/use-did-update-effect';
import { filterGuitarsAction } from '../../../../store/api-actioms';
import { FilterQuery } from '../../../../const';
import { GuitarFilterType } from '../../../../types/filter';

export default function Filter(): JSX.Element {
  const [guitarType, setGuitarType] = useState<GuitarFilterType>(
    {
      acoustic: false,
      electric: false,
      ukulele: false,
    },
  );

  const dispatch = useDispatch();

  useDidUpdateEffect(() => {
    let query = '';

    if (guitarType.acoustic) {
      query = query.concat(FilterQuery.Acoustic);
    }
    if (guitarType.electric) {
      query = query.concat(FilterQuery.Electric);
    }
    if (guitarType.ukulele) {
      query = query.concat(FilterQuery.Ukulele);
    }

    dispatch(filterGuitarsAction(query));
  }, [dispatch, guitarType.acoustic, guitarType.electric, guitarType.ukulele]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от"/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до"/>
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
