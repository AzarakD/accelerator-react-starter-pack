import { Guitar } from '../types/guitar';
import { State } from '../types/state';

export const getIsDataLoaded = ({isDataLoaded}: State): boolean => isDataLoaded;
export const getGuitars = ({guitars}: State): Guitar[] => guitars;
export const getGuitar = ({guitar}: State): Guitar => guitar;
export const getSorting = ({sorting}: State): string => sorting;
export const getFilter = ({filter}: State): string => filter;
