import { ISettings, ISettingStrategy } from '@/services/settingInstance';

export class APISetting implements ISettingStrategy {
  public getSettings = async () => {
    return null;
  };
  public getToken = async () => {
    return '';
  };
  public setSettings = (settings: ISettings) => {
    return null;
  };
  public resetSettings = async () => {};
}
