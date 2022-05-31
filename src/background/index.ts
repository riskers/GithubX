import setUpAxios, { R } from '@/services/db/APISetUp';
import './openOptionPage';
import './installed';
import './network';
import store from '@/options/store';

setUpAxios(R, store);
