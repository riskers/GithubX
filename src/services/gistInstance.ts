import { IItem } from '@/options/components/mid';
import { IDBGist } from '@/services/idb/gist';
import { ISeachGroupParams, ISeachTagParams } from '@/services/starInstance';

export interface IGist extends IItem {
  _id: string;
  description: string;
}

export interface IGistStrategy {
  resetGists(): Promise<void>;

  getGistsListByGroup(params: ISeachGroupParams): Promise<IGist[]>;

  /**
   * Many To Many
   *
   * 1. get star list where tag id = tagId
   * 2. add group
   * 3. add tag
   */
  getGistsListByTag(params: ISeachTagParams): Promise<IGist[]>;

  /**
   * save and update gist
   */
  addGist(gist: IGist): Promise<void>;

  delGist(id: number): Promise<void>;
}

class GistInstance implements IGistStrategy {
  private gistStrategy: IGistStrategy;

  public constructor() {
    // const dbSelect: ILocalStorage['SELECT_DB'] = window.localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    // this.groupStrategy = new IDBGroup();
    // } else {
    this.gistStrategy = new IDBGist();
    // }
  }

  public async resetGists(): Promise<void> {
    await this.gistStrategy.resetGists();
  }

  public async getGistsListByGroup(params: ISeachGroupParams): Promise<IGist[]> {
    return await this.gistStrategy.getGistsListByGroup(params);
  }

  public async getGistsListByTag(params: ISeachTagParams): Promise<IGist[]> {
    return await this.gistStrategy.getGistsListByTag(params);
  }

  public async addGist(gist: IGist): Promise<void> {
    await this.gistStrategy.addGist(gist);
  }

  public async delGist(id: number): Promise<void> {
    await this.gistStrategy.delGist(id);
  }
}

export const gistInstace = new GistInstance();
