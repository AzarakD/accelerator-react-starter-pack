import type { Guitar } from './guitar';

export type State = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  guitar: Guitar,
  displayedGuitars: Guitar[],
  sortMethod: string,
  filter: string,
};
