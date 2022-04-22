import { IStar } from '@/common/api';
import { getStarsListByGroup, getStarsListByTag, ISearchParams, searchStars } from '@/services/idb/stars';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStarsByGroup = createAsyncThunk('stars/fetchStarsByGroup', async (groupId: number) => {
  const stars = await getStarsListByGroup(groupId);
  return stars;
});

export const fetchStarsByTag = createAsyncThunk('stars/fetchStarsByTag', async (tagId: number) => {
  const stars = await getStarsListByTag(tagId);
  return stars;
});

export const searchStarsByParams = createAsyncThunk('stars/search', async (searchParams: ISearchParams) => {
  const stars = await searchStars(searchParams);
  return stars;
});

export interface IListState {
  loading: boolean;
  data: IStar[];
}

const initialState = {
  loading: false,
  data: [],
};

export const starsSlice = createSlice({
  name: 'stars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarsByGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarsByGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStarsByGroup.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchStarsByTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarsByTag.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStarsByTag.rejected, (state) => {
        state.loading = false;
      })

      .addCase(searchStarsByParams.pending, (state) => {
        state.loading = false;
      })
      .addCase(searchStarsByParams.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchStarsByParams.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default starsSlice.reducer;
