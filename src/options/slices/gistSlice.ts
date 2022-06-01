import { AS } from '@/services';
import { ISeachGroupParams, ISeachTagParams } from '@/services/model/star';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGistListByGroup = createAsyncThunk('gist/fetch/byGroup', async (params: ISeachGroupParams) => {
  const gists = await AS.gist.getGistsListByGroup(params);
  return gists;
});

export const getGistListByTag = createAsyncThunk('gist/fetch/byTag', async (params: ISeachTagParams) => {
  const gists = await AS.gist.getGistsListByTag(params);
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
