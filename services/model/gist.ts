import { IItem } from '@/options/components/mid';
import { ISeachGroupParams, ISeachTagParams } from '@/services/model/star';

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
