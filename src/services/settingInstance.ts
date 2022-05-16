import { ILocalStorage } from '@/services/constants';
import { APISetting } from '@/services/db/settings';
import { IDBSetting } from '@/services/idb/settings';

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

class SettingInstance implements ISettingStrategy {
  private settingStrategy: ISettingStrategy;

  public constructor() {
    // const dbSelect: ILocalStorage['SELECT_DB'] = window.localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    // switch (dbSelect) {
    //   case 'DB':
    this.settingStrategy = new APISetting();
    //     break;
    //   case 'IDB':
    // this.settingStrategy = new IDBSetting();
    //     break;
    //   default:
    //     this.settingStrategy = new IDBSetting();
    // }
  }

  public getSettings = async () => {
    const settings = await this.settingStrategy.getSettings();
    return settings;
  };

  public getToken = async () => {
    return await this.settingStrategy.getToken();
  };

  public setSettings = async (settings: ISettingModal) => {
    await this.settingStrategy.setSettings(settings);
  };

  public resetSettings = async () => {
    await this.settingStrategy.resetSettings();
  };
}

export const settingInstance = new SettingInstance();