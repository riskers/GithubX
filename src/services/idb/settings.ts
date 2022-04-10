import { db } from '@/services/idb/db';

export interface ISettings {
  /**
   * github username
   */
  username: string;

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

export const setSettings = async (settings: ISettings): Promise<void> => {
  await db.settings.put(settings);
};
