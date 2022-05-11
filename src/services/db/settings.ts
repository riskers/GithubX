import { ISettings, ISettingStrategy } from '@/services/settingInstance';
import axios from 'axios';

export class APISetting implements ISettingStrategy {
  public getSettings = async () => {
    const res = await axios.get('/api/setting');
    return res.data;
  };

  public getToken = async () => {
    return '';
  };

  public setSettings = (settings: ISettings) => {
    return null;
  };

  public resetSettings = async () => {};
}
