import * as IDBAPI from '@/content_script/services/local/group';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk('group/fetchGroups', async () => {
  const groupList = await IDBAPI.getGroupList();
  return groupList;
});

export const groupSlice = createSlice({
  name: 'groupList',
  initialState: {
    loading: false,
    data: [],
  },
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

export default groupSlice.reducer;
