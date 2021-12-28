import type { Guitar } from './guitar';

export type State = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  guitar: Guitar,
  sorting: string,
  filter: string,
  search: string,
  formReset: boolean,
  currentPage: number,
  totalCount: number | null,
};
