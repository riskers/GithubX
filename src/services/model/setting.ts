export interface ISettingModal {
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

export interface ISettingStrategy {
  resetSettings: () => Promise<void>;
  getSettings: () => Promise<ISettingModal>;
  getToken: () => Promise<string>;
  setSettings: (settings: ISettingModal) => Promise<void>;
}
