import { IStar } from '@/common/api';
import { IDBStar } from '@/services/idb/stars';

export interface ISeachGroupParams {
  groupId: number;
  description?: string;
}

export interface ISeachTagParams {
  tagId: number;
  fullName?: string;
}

export interface StarStrategy {
  resetStars(): Promise<void>;
  syncStars(): Promise<void>;
  getStarsListByGroup(params: ISeachGroupParams): Promise<IStar[]>;
  getStarsListByTag(params: ISeachTagParams): Promise<IStar[]>;
  getStarInfo(id: number): Promise<IStar>;
  getStarInfoByFullName(fullName: string): Promise<IStar>;
  delStar(id: number): Promise<void>;
  addStar(star: IStar): Promise<void>;
}

class StarInstance implements StarStrategy {
  private starStrategy: StarStrategy;

  public constructor() {
    // const dbSelect: ILocalStorage['SELECT_DB'] = window.localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    this.starStrategy = new IDBStar();
    // } else {
    // this.starStrategy = new APIStar();
    // }
  }

  public async resetStars(): Promise<void> {
    await this.starStrategy.resetStars();
  }

  public async syncStars(): Promise<void> {
    await this.starStrategy.syncStars();
  }

  public async getStarsListByGroup(params: ISeachGroupParams): Promise<IStar[]> {
    return await this.starStrategy.getStarsListByGroup(params);
  }

  public async getStarsListByTag(params: ISeachTagParams): Promise<IStar[]> {
    return await this.starStrategy.getStarsListByTag(params);
  }

  public async getStarInfo(id: number): Promise<IStar> {
    return await this.starStrategy.getStarInfo(id);
  }

  public async getStarInfoByFullName(fullName: string): Promise<IStar> {
    return await this.starStrategy.getStarInfoByFullName(fullName);
  }

  public async delStar(id: number): Promise<void> {
    return await this.starStrategy.delStar(id);
  }

  public async addStar(star: IStar): Promise<void> {
    return await this.starStrategy.addStar(star);
  }
}

export const starInstace = new StarInstance();
