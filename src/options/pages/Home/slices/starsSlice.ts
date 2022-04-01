import { getStarsListByGroup, getStarsListByTag } from '@/content_script/services/local/stars';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchStarsByGroup = createAsyncThunk('stars/fetchStarsByGroup', async (groupId: string) => {
  const stars = await getStarsListByGroup(groupId);
  return stars;
});

export const fetchStarsByTag = createAsyncThunk('stars/fetchStarsByTag', async (tagId: string) => {
  const stars = await getStarsListByTag(tagId);
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
    // TODO ugly
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
