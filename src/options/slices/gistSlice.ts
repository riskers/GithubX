import { getGistsListByGroup, getGistsListByTag } from '@/services/idb/gist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGistListByGroup = createAsyncThunk('gist/fetch/byGroup', async (groupId: number) => {
  const gists = await getGistsListByGroup(groupId);
  return gists;
});

export const getGistListByTag = createAsyncThunk('gist/fetch/byTag', async (tagId: number) => {
  const gists = await getGistsListByTag(tagId);
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
      .addCase(getGistListByGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGistListByGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getGistListByGroup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGistListByTag.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default gistSlice.reducer;
