import { db } from '@/services/idb/db';

export interface ISettings {
  /**
   * github token
   */
  token: string;

  /**
   * create time
   */
  createdTime?: number;

  /**
   * update time
   */
  updatedTime?: number;
}

export const resetSettings = async (): Promise<void> => {
  await db.settings.clear();
};

export const getSettings = async (): Promise<ISettings> => {
  return await db.settings.toCollection().first();
};

export const getToken = async (): Promise<string> => {
  const settings = await getSettings();
  return settings.token;
};

export const setSettings = async (settings: ISettings): Promise<void> => {
  await db.settings.put(settings);
};
