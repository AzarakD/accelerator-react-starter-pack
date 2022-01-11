import { Guitar } from '../types/guitar';
import { State } from '../types/state';

export const getIsDataLoaded = ({isDataLoaded}: State): boolean => isDataLoaded;
export const getIsFailed = ({isFailed}: State): boolean => isFailed;
export const getGuitars = ({guitars}: State): Guitar[] => guitars;
export const getGuitar = ({guitar}: State): Guitar => guitar;
export const getSorting = ({sorting}: State): string => sorting;
export const getFilter = ({filter}: State): string => filter;
export const getSearch = ({search}: State): string => search;
export const getFormReset = ({formReset}: State): boolean => formReset;
export const getCurrentPage = ({currentPage}: State): number => currentPage;
export const getTotalCount = ({totalCount}: State): number => totalCount as number;
