import gistSlice from '@/options/slices/gistSlice';
import groupSlice from '@/options/slices/groupSlice';
import selectedItemSlice from '@/options/slices/selectedItemSlice';
import selectedStarSlice from '@/options/slices/selectedStar';
import settingsSlice from '@/options/slices/settingsSlice';
import starsSlice from '@/options/slices/starsSlice';
import tagSlice from '@/options/slices/tagSlice';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const logger = (store) => (next) => (action) => {
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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
