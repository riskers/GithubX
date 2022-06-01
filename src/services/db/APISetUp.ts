import { API_URL_KEY } from '@/common/storage';
import { NotifySlice } from '@/options/slices/notifySlice';
import { RootState, Store } from '@/options/store';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';
import axios, { Axios } from 'axios';

const baseUrl = (await chrome.storage.local.get(API_URL_KEY))[API_URL_KEY];

export const R = axios.create({
  // why add this adapter: https://stackoverflow.com/questions/66305856/typeerror-adapter-is-not-a-function-error-when-using-axios-and-webpack-in-chrom
  adapter: fetchAdapter,
  baseURL: baseUrl,
});

const setUpAxios = (axiosInstance: Axios, store: Store) => {
  R.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.code === 0) {
        return response.data.data;
      }

      store.dispatch(NotifySlice.actions.open({ message: response.data.message }));
    },
    (error) => {
      let message = '';
      if (!store.getState().settings.data.token) {
        message = 'Please configuration';
      } else {
        message = error.message;
      }

      store.dispatch(NotifySlice.actions.open({ message }));

      return Promise.reject(error);
    },
  );
};

export default setUpAxios;
