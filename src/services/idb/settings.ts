import { db } from '@/services/idb/db';
import { ISettingModal, ISettingStrategy } from '@/services/settingInstance';

export class IDBSetting implements ISettingStrategy {
  public getSettings = async () => {
    return await db.settings.toCollection().first();
  };

  public resetSettings = async () => {
    await db.settings.clear();
  };

  public getToken = async (): Promise<string> => {
    const settings = await this.getSettings();
    return settings.token;
  };

  public setSettings = async (settings: ISettingModal): Promise<void> => {
    await db.settings.put(settings);
  };
}
