import { State } from '../../types/state';

export const getSorting = ({filter}: State): string => filter.sorting;
export const getFilter = ({filter}: State): string => filter.filter;
export const getSearch = ({filter}: State): string => filter.search;
export const getFormReset = ({filter}: State): boolean => filter.formReset;
export const getCurrentPage = ({filter}: State): number => filter.currentPage;
