import { RootState } from '@/options/store';
import { createSlice } from '@reduxjs/toolkit';

export const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    name: '',
    id: '-1',
  },
  reducers: {
    selectGroup: (state, action) => {
      // https://github.com/reduxjs/redux-toolkit/issues/521#issuecomment-624796711
      return action.payload;
    },
  },
});

export const { selectGroup } = selectedSlice.actions;
export const selectorGroup = (state: RootState) => state.selectedGroup;
export default selectedSlice.reducer;
