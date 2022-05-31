import { API_URL_KEY, clear, getValue, TOKEN_KEY } from '@/common/storage';
import { AS } from '@/services';
import delay from '@/utils/delay';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  const token = await getValue(TOKEN_KEY);
  return {
    token,
  };
});

interface ISettingModal {
  token: string;
}

/**
 * reset app data
 */
export const resetAppData = createAsyncThunk<ISettingModal, string>('settings/clear', async (token: string) => {
  const setting = {
    token,
  };

  await AS.star.resetStars();
  await AS.group.resetGroup();
  await AS.tag.resetTag();
  await AS.sjt.resetStarJTag();
  await AS.gist.resetGists();
  await AS.gjt.resetGistJTag();

  await delay(1000);

  window.location.reload();

  return setting;
});

export const syncData = createAsyncThunk('settings/sync', async () => {
  const token = await getValue(TOKEN_KEY);

  await AS.star.syncStars();

  await delay(1000);

  return {
    token,
  };
});

const initData: ISettingModal = {
  token: '',
};

export const settingsSlice = createSlice({
  name: 'setting',
  initialState: {
    data: initData,
    /**
     * fetch some api
     */
    loading: false,
    /**
     * manual trigger open model
     */
    open: false,
  },
  reducers: {
    openSettingsModel: (state) => {
      state.open = true;
    },
    closeSettingsMode: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        if (!action.payload.token) {
          state.data.token = '';
          state.open = true;
        } else {
          state.data.token = action.payload.token;
        }
      })

      .addCase(resetAppData.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetAppData.fulfilled, (state, action) => {
        state.data.token = action.payload.token;
        state.loading = false;
        state.open = false;
      })

      .addCase(syncData.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncData.fulfilled, (state, action) => {
        state.data.token = action.payload.token;
        state.loading = false;
      });
  },
});

export default settingsSlice.reducer;
