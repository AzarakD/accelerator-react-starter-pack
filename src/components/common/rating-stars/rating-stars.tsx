import { setRatingStar } from '../../../utils';

const STAR_COUNT = 5;

export default function RatingStars({rating}: {rating: number}): JSX.Element {
  const stars= [];

  for (let i = 1; i <= STAR_COUNT; i++) {
    stars.push(
      <svg width="12" height="11" aria-hidden="true" key={i}>
        <use xlinkHref={setRatingStar(rating, i)}></use>
      </svg>,
    );
  }

  return (
    <>
      <span className="visually-hidden">Рейтинг:</span>
      {stars}
    </>
  );
}
