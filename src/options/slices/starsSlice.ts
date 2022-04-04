import { getStarsListByGroup, getStarsListByTag } from '@/services/idb/stars';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStarsByGroup = createAsyncThunk('stars/fetchStarsByGroup', async (groupId: number) => {
  const stars = await getStarsListByGroup(groupId);
  return stars;
});

export const fetchStarsByTag = createAsyncThunk('stars/fetchStarsByTag', async (tagId: number) => {
  const stars = await getStarsListByTag(tagId);
  console.log(stars);
  return stars;
});

export const starsSlice = createSlice({
  name: 'stars',
  initialState: {
    loading: false,
    data: [],
  },
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
      });
  },
});

export default starsSlice.reducer;
