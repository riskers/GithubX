import { ILocalStorage } from '@/services/constants';
import { APITag } from '@/services/db/tag';
import { IDBTag } from '@/services/idb/tag';

export interface ITagModel {
  id?: number;
  name: string;
  starCount?: number;
  gistCount?: number;
}

export interface ITagStrategy {
  resetTag(): Promise<void>;

  /**
   * @param name tagName
   * @param sid starId
   *
   * @returns tagId
   *
   */
  addTagWithSid(name: string, sid: number): Promise<number>;

  addTagWithGid(name: string, gid: number): Promise<number>;

  updateTag(id: number, tag: Pick<ITagModel, 'name'>): Promise<void>;

  getTagInfo(tagId: number): Promise<ITagModel>;

  getTagsList(): Promise<ITagModel[]>;

  /**
   * get all tag of a star
   */
  getTagsInStar(sid: number): Promise<ITagModel[]>;

  /**
   * get all tag of a gist
   */
  getTagsInGist(gid: number): Promise<ITagModel[]>;

  /**
   * 1. TABLE tag: delete the tag
   * 2. TABLE starsJTags: delete tid = tagId
   */
  deleteTag(tagId: number): Promise<void>;
}

class TagInstance implements ITagStrategy {
  private tagStrategy: ITagStrategy;

  public constructor() {
    // const dbSelect: ILocalStorage['SELECT_DB'] = window.localStorage.getItem('SELECT_DB') as ILocalStorage['SELECT_DB'];
    // this.tagStrategy = new IDBTag();
    // } else {
    this.tagStrategy = new APITag();
    // }
  }

  public async resetTag(): Promise<void> {
    this.tagStrategy.resetTag();
  }

  public async addTagWithSid(name: string, sid: number): Promise<number> {
    return await this.tagStrategy.addTagWithSid(name, sid);
  }

  public async addTagWithGid(name: string, gid: number): Promise<number> {
    return await this.tagStrategy.addTagWithGid(name, gid);
  }

  public async updateTag(id: number, tag: Pick<ITagModel, 'name'>): Promise<void> {
    await this.tagStrategy.updateTag(id, tag);
  }

  public async getTagInfo(tagId: number): Promise<ITagModel> {
    return await this.tagStrategy.getTagInfo(tagId);
  }

  public async getTagsList(): Promise<ITagModel[]> {
    return await this.tagStrategy.getTagsList();
  }

  public async getTagsInStar(sid: number): Promise<ITagModel[]> {
    return await this.tagStrategy.getTagsInStar(sid);
  }

  public async getTagsInGist(gid: number): Promise<ITagModel[]> {
    return await this.tagStrategy.getTagsInGist(gid);
  }

  public async deleteTag(tagId: number): Promise<void> {
    await this.tagStrategy.deleteTag(tagId);
  }
}

export const tagInstace = new TagInstance();
