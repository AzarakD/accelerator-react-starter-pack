import { useSelector } from 'react-redux';
import {
  getGuitars,
  getIsDataLoaded
} from '../../../../store/selectors';
import GuitarCard from '../guitar-card/guitar-card';

export default function Cards(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const isLoaded = useSelector(getIsDataLoaded);

  return (
    <div className="cards catalog__cards">
      {
        isLoaded
          ?
          guitars.map((guitar) => <GuitarCard guitar={guitar} key={guitar.id}/>)
          :
          <>Loading...</>
      }
    </div>
  );
}
