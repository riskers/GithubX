import { starsReducer } from '@/options/pages/Home/reducers';
import groupSlice from '@/options/pages/Home/slices/groupSlice';
import selectedSlice from '@/options/pages/Home/slices/selectedSlice';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const store = configureStore({
  reducer: {
    stars: starsReducer,
    groups: groupSlice,
    selectedGroup: selectedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
