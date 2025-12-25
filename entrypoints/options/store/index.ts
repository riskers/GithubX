import gistSlice from '../slices/gistSlice';
import groupSlice from '../slices/groupSlice';
import notifySlice from '../slices/notifySlice';
import searchSlice from '../slices/searchSlice';
import selectedItemSlice from '../slices/selectedItemSlice';
import selectedStarSlice from '../slices/selectedStar';
import settingsSlice from '../slices/settingsSlice';
import starsSlice from '../slices/starsSlice';
import tagSlice from '../slices/tagSlice';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const store = configureStore({
  reducer: {
    stars: starsSlice,
    groups: groupSlice,
    tags: tagSlice,
    settings: settingsSlice,
    selectedItem: selectedItemSlice,
    selectedStar: selectedStarSlice,
    gists: gistSlice,
    notify: notifySlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
