import { starsReducer } from '@/options/pages/Home/reducers';
import groupSlice from '@/options/pages/Home/slices/groupSlice';
import selectedSlice from '@/options/pages/Home/slices/selectedSlice';
import starsSlice from '@/options/pages/Home/slices/starsSlice';
import tagSlice from '@/options/pages/Home/slices/tagSlice';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const store = configureStore({
  reducer: {
    stars: starsSlice,
    groups: groupSlice,
    tags: tagSlice,
    selectedGroup: selectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
