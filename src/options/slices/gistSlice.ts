import { getGistsList } from '@/common/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGistList = createAsyncThunk('gist/fetch', async () => {
  const res = await getGistsList();
  return res;
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
