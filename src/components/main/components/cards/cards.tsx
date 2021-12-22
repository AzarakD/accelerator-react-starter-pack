import { useSelector } from 'react-redux';
import { getDisplayedGuitars } from '../../../../store/selectors';
import GuitarCard from '../guitar-card/guitar-card';

export default function Cards(): JSX.Element {
  const guitars = useSelector(getDisplayedGuitars);

  return (
    <div className="cards catalog__cards">
      {
        guitars.length !== 0
          ?
          guitars.map((guitar) => <GuitarCard guitar={guitar} key={guitar.id}/>)
          :
          <>Товар не найден.</>
      }
    </div>
  );
}
