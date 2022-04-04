import { IStar } from '@/common/api';
import { RootState } from '@/options/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IStar = {
  fullName: '',
  groupId: 0,
  id: -1,
  htmlUrl: '',
};

export const selectedStarSlice = createSlice({
  name: 'selectStar',
  initialState,
  reducers: {
    selectStar: (state, action: PayloadAction<IStar>) => {
      return action.payload;
    },
  },
});

export const selectorStar = (state: RootState) => state.selectedStar;

export default selectedStarSlice.reducer;
