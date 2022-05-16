import { ISettingModal, ISettingStrategy } from '@/services/settingInstance';
import axios from 'axios';

export class APISetting implements ISettingStrategy {
  public async getSettings(): Promise<ISettingModal> {
    return await axios.get('/api/setting');
  }

  public async getToken(): Promise<string> {
    const res = await this.getSettings();

    return res.token;
  }

  public setSettings = async (settings: ISettingModal) => {
    await axios.post('/api/setting', {
      ...settings,
    });
  };

  public resetSettings = async () => {
    await axios.delete('/api/setting');
  };
}
