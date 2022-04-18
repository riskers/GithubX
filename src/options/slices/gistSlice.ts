import { RootState } from '@/options/store';
import { getGistsListByGroup } from '@/services/idb/gist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGistList = createAsyncThunk('gist/fetch', async (groupId: number) => {
  const gists = await getGistsListByGroup(groupId);
  return gists;
});

export const gistSlice = createSlice({
  name: 'gist',
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGistList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGistList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getGistList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default gistSlice.reducer;
