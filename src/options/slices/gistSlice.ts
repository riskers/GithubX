import { getGistsListByGroup, getGistsListByTag, searchGists } from '@/services/idb/gist';
import { ISearchParams } from '@/services/idb/stars';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGistListByGroup = createAsyncThunk('gist/fetch/byGroup', async (groupId: number) => {
  const gists = await getGistsListByGroup(groupId);
  return gists;
});

export const getGistListByTag = createAsyncThunk('gist/fetch/byTag', async (tagId: number) => {
  const gists = await getGistsListByTag(tagId);
  return gists;
});

export const searchGistsByParams = createAsyncThunk('gist/search', async (fullName: ISearchParams) => {
  const stars = await searchGists(fullName);
  return stars;
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
      })
      .addCase(searchGistsByParams.pending, (state) => {
        state.loading = false;
      })
      .addCase(searchGistsByParams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchGistsByParams.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default gistSlice.reducer;
