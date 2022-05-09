import { resetGists } from '@/services/idb/gist';
import { resetGistJTag } from '@/services/idb/gistsJTags';
import { resetGroup } from '@/services/idb/group';
import { resetStars, syncStars } from '@/services/idb/stars';
import { resetStarJTag } from '@/services/idb/starsJTags';
import { resetTag } from '@/services/idb/tag';
import { ISettings, settingInstance } from '@/services/settingInstance';
import delay from '@/utils/delay';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async () => {
  const settings = await settingInstance.getSettings();
  return settings;
});

/**
 * reset app data
 */
export const resetAppData = createAsyncThunk<ISettings, string>('settings/clear', async (token: string) => {
  const setting = {
    token,
    createdTime: Date.now(),
    updatedTime: Date.now(),
  };

  await settingInstance.resetSettings();
  await settingInstance.setSettings(setting);

  await resetStars();

  await resetGroup();
  await resetTag();
  await resetStarJTag();
  await resetGists();
  await resetGistJTag();

  await delay(1000);

  return setting;
});

export const syncData = createAsyncThunk('settings/sync', async () => {
  const setting = await settingInstance.getSettings();

  await syncStars();

  await delay(1000);

  return {
    ...setting,
    createdTime: Date.now(),
    updatedTime: Date.now(),
  };
});

const initData: ISettings = {
  token: null,
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
        if (!action.payload) {
          state.data.token = '';
          state.open = true;
        } else {
          state.data.token = action.payload.token;
          state.data.createdTime = action.payload.createdTime;
          state.data.updatedTime = action.payload.updatedTime;
        }
      })

      .addCase(resetAppData.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetAppData.fulfilled, (state, action) => {
        state.data.token = action.payload.token;
        state.data.createdTime = action.payload.createdTime;
        state.data.updatedTime = action.payload.updatedTime;
        state.loading = false;
        state.open = false;
      })

      .addCase(syncData.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncData.fulfilled, (state, action) => {
        state.data.token = action.payload.token;
        state.data.createdTime = action.payload.createdTime;
        state.data.updatedTime = action.payload.updatedTime;
        state.loading = false;
      });
  },
});

export default settingsSlice.reducer;
