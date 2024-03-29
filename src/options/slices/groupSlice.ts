import { AS } from '@/services';
import { IGroupModel } from '@/services/model/group';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk('group/fetchGroups', async () => {
  const groupList = await AS.group.getGroupList();
  return groupList;
});

export interface IGroupState {
  loading: boolean;
  data: IGroupModel[];
}

const initialState: IGroupState = {
  loading: false,
  data: [],
};

export const groupSlice = createSlice({
  name: 'groupList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.loading = false;
      });
  },
});

type x = typeof groupSlice.reducer;

export default groupSlice.reducer;
