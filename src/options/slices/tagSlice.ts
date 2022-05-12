import { ITagModel, tagInstace } from '@/services/tagInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * update tags in side bar
 */
export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
  const tagList = await tagInstace.getTagsList();
  return tagList;
});

export interface ITagState {
  loading: boolean;
  data: ITagModel[];
}

const initialState = {
  loading: false,
  data: [],
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default tagSlice.reducer;
