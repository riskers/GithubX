import { IItem } from '@/options/components/mid';

export interface IStarModel extends IItem {
  fullName: string;
}

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
  getStarsListByGroup(params: ISeachGroupParams): Promise<IStarModel[]>;
  getStarsListByTag(params: ISeachTagParams): Promise<IStarModel[]>;
  getStarInfo(id: number): Promise<IStarModel>;
  getStarInfoByFullName(fullName: string): Promise<IStarModel>;
  delStar(id: number): Promise<void>;
  addStar(star: IStarModel): Promise<void>;
}
