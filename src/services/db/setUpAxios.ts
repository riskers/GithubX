import { NotifySlice } from '@/options/slices/notifySlice';
import store from '@/options/store';
import axios from 'axios';

const setUpAxios = () => {
  axios.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.code === 0) {
        console.log(response.data);
        return response.data.data;
      }

      store.dispatch(NotifySlice.actions.open({ message: response.data.message }));
    },

    (error) => {
      store.dispatch(NotifySlice.actions.open({ message: error.message }));
      return Promise.reject(error);
    },
  );

  axios.defaults.baseURL = 'http://localhost:8910';
};

export default setUpAxios;
