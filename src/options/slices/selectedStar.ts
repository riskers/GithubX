import { IStar } from '@/common/api';
import { DEFAULT_SELECTED_ITEM } from '@/options/slices/selectedItemSlice';
import { RootState } from '@/options/store';
import { DEFAULT_GROUP } from '@/services/idb/group';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IStar = {
  fullName: '',
  groupId: DEFAULT_GROUP.id,
  id: -1,
  htmlUrl: '',
  group: DEFAULT_SELECTED_ITEM.group,
  tags: [DEFAULT_SELECTED_ITEM.tag],
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
