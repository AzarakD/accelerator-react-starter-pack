import { useHistory } from 'react-router-dom';
import { setGuitarType } from '../../../../utils';
import { TabsProps } from './type';

const tabs = ['characteristics', 'description'];
const DEFAULT_TAB = tabs[0];

export default function Tabs(props: TabsProps): JSX.Element {
  const {
    vendorCode,
    type,
    stringCount,
    description,
  } = props;

  const history = useHistory();

  const hash = history.location.hash.slice(1);
  const currentTab = tabs.includes(hash) ? hash : DEFAULT_TAB;

  return (
    <div className="tabs">
      <a className={`button button--medium tabs__button ${currentTab !== DEFAULT_TAB ? 'button--black-border' : ''}`} href="#characteristics">Характеристики</a>
      <a className={`button button--medium tabs__button ${currentTab === DEFAULT_TAB ? 'button--black-border' : ''}`} href="#description">Описание</a>
      <div className="tabs__content" id={`${currentTab}`}>
        <table className={`tabs__table ${currentTab !== DEFAULT_TAB ? 'hidden' : ''}`}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">
                {setGuitarType(type)}
              </td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{`${stringCount} струнная`}</td>
            </tr>
          </tbody>
        </table>
        <p className={`tabs__product-description ${currentTab === DEFAULT_TAB ? 'hidden' : ''}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
