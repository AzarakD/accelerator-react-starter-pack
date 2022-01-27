import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { Comment } from '../types/comment';
import { Guitar } from '../types/guitar';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitar[], itemCount: number) => ({payload: {
    guitars: guitars,
    itemCount: itemCount,
  }}),
);

export const loadGuitar = createAction(
  ActionType.LoadGuitar,
  (guitar: Guitar) => ({payload: guitar}),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comment[]) => ({payload: comments}),
);

export const updateComments = createAction(
  ActionType.UpdateComments,
  (comments: Comment[], guitarComments: Comment[]) => ({payload: {
    comments: comments,
    guitarComments: guitarComments,
  }}),
);

export const changeSorting = createAction(
  ActionType.ChangeSorting,
  (sorting: string) => ({payload: sorting}),
);

export const changeFilter = createAction(
  ActionType.ChangeFilter,
  (filter: string) => ({payload: filter}),
);

export const changeSearch = createAction(
  ActionType.ChangeSearch,
  (search: string) => ({payload: search}),
);

export const resetForm = createAction(
  ActionType.ResetForm,
);

export const setCurrentPage = createAction(
  ActionType.SetCurrentPage,
  (currentPage: number) => ({payload: currentPage}),
);

export const addToCart = createAction(
  ActionType.AddToCart,
  (guitar: Guitar) => ({payload: guitar}),
);

export const removeFromCart = createAction(
  ActionType.RemoveFromCart,
  (id: number) => ({payload: id}),
);

export const setCartItemCount = createAction(
  ActionType.SetCartItemCount,
  (id: number, count: number) => ({payload: {
    id: id,
    count: count,
  }}),
);
