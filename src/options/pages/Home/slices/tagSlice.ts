import { getTagsList } from '@/content_script/services/local/tag';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
  const tagList = await getTagsList();
  return tagList;
});

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    loading: false,
    data: [],
  },
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
