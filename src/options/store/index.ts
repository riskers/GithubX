import groupSlice from '@/options/pages/Home/slices/groupSlice';
import selectedItemSlice from '@/options/pages/Home/slices/selectedItemSlice';
import selectedStarSlice from '@/options/pages/Home/slices/selectedStar';
import starsSlice from '@/options/pages/Home/slices/starsSlice';
import tagSlice from '@/options/pages/Home/slices/tagSlice';
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
    selectedItem: selectedItemSlice,
    selectedStar: selectedStarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
