import { AS } from '@/services';
import { db } from '@/services/idb/IDBSetUp';
import { ITagModel, ITagStrategy } from '@/services/model/tag';

export class IDBTag implements ITagStrategy {
  public resetTag = async (): Promise<void> => {
    await db.tags.clear();
  };

  public addTagWithSid = async (name: string, sid: number): Promise<number> => {
    const tagId = await db.tags.add({
      name,
    });

    await AS.sjt.addSJT(tagId, sid);

    return tagId;
  };

  public addTagWithGid = async (name: string, gid: number): Promise<number> => {
    const tagId = await db.tags.add({
      name,
    });

    await AS.gjt.addGJT(tagId, gid);

    return tagId;
  };

  public updateTag = async (id: number, tag: Pick<ITagModel, 'name'>) => {
    await db.tags.update(id, { name: tag.name });
  };

  public getTagInfo = async (tagId: number) => {
    const tagInfo = await db.tags.where({ id: tagId }).first();
    return tagInfo;
  };

  public getTagsList = async (): Promise<ITagModel[]> => {
    const tagList = await db.tags.toArray();

    for (const tag of tagList) {
      const starCount = await db.starsJTags.where({ tid: tag.id }).count();
      const gistCount = await db.gistsJTags.where({ tid: tag.id }).count();

      tag.starCount = starCount;
      tag.gistCount = gistCount;
    }

    return tagList;
  };

  public getTagsInStar = async (sid: number) => {
    const sidInTidList = await db.starsJTags.where({ sid }).toArray();

    let tags = [];

    for (let sidInTid of sidInTidList) {
      const tagInfo = await this.getTagInfo(sidInTid.tid);
      tags.push(tagInfo);
    }

    return tags;
  };

  public getTagsInGist = async (gid: number) => {
    const gidInTidList = await db.gistsJTags.where({ gid }).toArray();

    let tags = [];

    for (let gidInTid of gidInTidList) {
      const tagInfo = await this.getTagInfo(gidInTid.tid);
      tags.push(tagInfo);
    }

    return tags;
  };

  public deleteTag = async (tagId: number): Promise<void> => {
    await db.tags.where({ id: tagId }).delete();
    await AS.sjt.deleteSJTByTid(tagId);
  };
}
