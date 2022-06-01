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
