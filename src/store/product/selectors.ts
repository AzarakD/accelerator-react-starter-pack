import { Comment } from '../../types/comment';
import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';

export const getGuitars = ({product}: State): Guitar[] => product.guitars;
export const getGuitar = ({product}: State): Guitar => product.guitar;
export const getComments = ({product}: State): Comment[] => product.comments;
export const getTotalCount = ({product}: State): number => product.totalCount as number;
