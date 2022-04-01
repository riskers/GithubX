import { RootState } from '@/options/store';
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_GROUP = { name: '', id: '-1' };
const DEFAULT_TAG = { id: '-1', name: '' };

export const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    group: DEFAULT_GROUP,
    tag: DEFAULT_TAG,
  },
  reducers: {
    selectGroup: (state, action) => {
      // https://github.com/reduxjs/redux-toolkit/issues/521#issuecomment-624796711
      state.group = action.payload.group;
      state.tag = DEFAULT_TAG;
    },
    selectTag: (state, action) => {
      state.group = DEFAULT_GROUP;
      state.tag = action.payload.tag;
    },
  },
});

export const { selectGroup, selectTag } = selectedSlice.actions;
export const selectorItem = (state: RootState) => state.selectedGroup;
export default selectedSlice.reducer;
