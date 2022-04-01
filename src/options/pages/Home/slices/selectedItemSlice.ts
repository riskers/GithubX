import { RootState } from '@/options/store';
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_GROUP = { id: '-1', name: '' };
const DEFAULT_TAG = { id: '-1', name: '' };

export const DEFAULT_SELECTED_ITEM = {
  group: DEFAULT_GROUP,
  tag: DEFAULT_TAG,
};

export const selectedItemSlice = createSlice({
  name: 'selected',
  initialState: DEFAULT_SELECTED_ITEM,
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

export const { selectGroup, selectTag } = selectedItemSlice.actions;
export const selectorItem = (state: RootState) => state.selectedItem;
export default selectedItemSlice.reducer;
