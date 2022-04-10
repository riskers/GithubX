import { resetGroup } from '@/services/idb/group';
import * as IDBAPI from '@/services/idb/settings';
import { resetStars } from '@/services/idb/stars';
import { resetStarJTag } from '@/services/idb/starsJTags';
import { resetTag } from '@/services/idb/tag';
import delay from '@/utils/delay';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  const settings = await IDBAPI.getSettings();
  return settings;
});

/**
 * clear data
 */
export const clearData = createAsyncThunk<IDBAPI.ISettings, string>('settings/clear', async (username: string) => {
  await resetStars(username);
  await resetGroup();
  await resetTag();
  await resetStarJTag();

  const setting = {
    username,
    createdTime: Date.now(),
    updatedTime: Date.now(),
  };

  await IDBAPI.resetSettings();
  await IDBAPI.setSettings(setting);

  await delay(1000);

  return setting;
});

const initData: IDBAPI.ISettings = {
  username: null,
};

export const settingsSlice = createSlice({
  name: 'user',
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
        if (!action.payload) {
          state.data.username = '';
          state.open = true;
        } else {
          state.data.username = action.payload.username;
          state.data.createdTime = action.payload.createdTime;
          state.data.updatedTime = action.payload.updatedTime;
        }
      })

      .addCase(clearData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearData.fulfilled, (state, action) => {
        state.data.username = action.payload.username;
        state.data.createdTime = action.payload.createdTime;
        state.data.updatedTime = action.payload.updatedTime;
        state.loading = false;
        state.open = false;
      });
  },
});

export default settingsSlice.reducer;
