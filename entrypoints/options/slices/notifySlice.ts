import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  open: boolean;
  message: string;
  level?: AlertColor;
}

const initialState: IState = {
  open: false,
  level: 'error',
  message: '',
};

export const NotifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Omit<IState, 'open'>>) => {
      state.open = true;
      state.level = action.payload.level ?? 'error';
      state.message = action.payload.message;
    },
    close: (state, action: PayloadAction<Omit<IState, 'open'>>) => {
      state.open = false;
      state.message = '';
    },
  },
});

export default NotifySlice.reducer;
