import { ISettingModal, ISettingStrategy } from '@/services/settingInstance';
import axios from 'axios';

export class APISetting implements ISettingStrategy {
  public getSettings = async () => {
    const res = await axios.get<ISettingModal>('/api/setting');
    return res.data;
  };

  public getToken = async () => {
    const res = await this.getSettings();
    console.log(res);
    return res.token;
  };

  public setSettings = async (settings: ISettingModal) => {
    await axios.post('/api/setting', {
      ...settings,
    });
  };

  public resetSettings = async () => {
    await axios.delete('/api/setting');
  };
}
