import ChromeStorage from '@/common/ChromeStorage';

const CHROME_STORAGE_KEY = 'SETTINGS';

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
  const cs = new ChromeStorage();

  await cs.remove(CHROME_STORAGE_KEY);
  await cs.set(CHROME_STORAGE_KEY, {});
};

export const getSettings = async (): Promise<ISettings> => {
  const cs = new ChromeStorage();

  const settings = (await cs.get(CHROME_STORAGE_KEY)) as ISettings;

  return settings;
};

export const setSettings = async (settings: ISettings): Promise<void> => {
  const cs = new ChromeStorage();
  await cs.set(CHROME_STORAGE_KEY, settings);
};
