import { Comment } from './comment';
import { Guitar } from './guitar';

export type State = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  isFailed: boolean,
  guitar: Guitar,
  comments: Comment[],
  sorting: string,
  filter: string,
  search: string,
  formReset: boolean,
  currentPage: number,
  totalCount: number | null,
  cart: Guitar[],
};
