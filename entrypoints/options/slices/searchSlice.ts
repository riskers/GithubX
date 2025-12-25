import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearch {
  keyword: string;
}

const initialState: ISearch = {
  keyword: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<ISearch>) => {
      console.log(action);
      state.keyword = action.payload.keyword;
    },
  },
});

export default searchSlice.reducer;
